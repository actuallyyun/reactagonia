import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Carousel, Button } from 'flowbite-react'
import { redirect } from 'react-router-dom'

import {
  useGetSingleProductQuery,
  useDeleteProductMutation
} from '../../services/product'
import AddToCart from '../../components/cart/AddToCart'
import { AppState } from '../../app/store'
import UpdateProductForm from '../../components/product/UpdateProductForm'
import { isAdmin } from '../../components/user/userSlice'
import CustomBreadcrumb from '../../components/common/CustomBreadcrumb'
import { Feedback } from '../../misc/type'
import { cleanImageUrl, generateRandomImage } from '../../misc/utils'
import { useEffect } from 'react'

const RemoveProduct = ({
  id,
  feedback
}: {
  id: number
  feedback: Feedback
}) => {
  const [deleteProduct] = useDeleteProductMutation()
  const handleRemove = async (id: number) => {
    try {
      const payload = await deleteProduct(id).unwrap()
      if (payload) {
        feedback.handleSuccess('Product delete successfully.')
      } else {
        feedback.handleError('Unkown error')
      }
    } catch (err) {
      feedback.handleError(err)
    }
  }

  return (
    <div className='grid gap-4  bg-gray-200 rounded-lg py-12 px-8'>
      <h4>Remove product</h4>
      <p>
        Once the product is removed, you will not be able to access it any more.
      </p>

      <Button onClick={() => handleRemove(id)} color='warning' pill>
        Remove
      </Button>
    </div>
  )
}

function ProductCarousel({ images }: { images: string[] | undefined }) {
  if (!images) {
    return null
  }
  return (
    <div className='h-96'>
      <Carousel>
        {images &&
          images.map((img) => {
            return (
              <div className='flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white'>
                <img src={img} alt='product' key={img} />
              </div>
            )
          })}
      </Carousel>
    </div>
  )
}

export default function SingleProductPage({
  feedback
}: {
  feedback: Feedback
}) {
  const nav = useNavigate()
  const admin = useSelector(isAdmin)
  const { productId } = useParams()

  const { data, error, isLoading } = useGetSingleProductQuery(Number(productId))

  useEffect(() => {
    if (error) {
      nav('/')
    }
  }, [error])

  const images = data?.images.map((img) => {
    return cleanImageUrl(img) ?? generateRandomImage()
  })
  const { isLoggedIn } = useSelector((state: AppState) => state.user)

  return (
    <div className='container mx-auto px-4 md:px-16 py-16'>
      <div className='grid md:grid-cols-2 gap-8'>
        <div>{data && <ProductCarousel images={images} />}</div>
        <div className='grid gap-2'>
          {data && (
            <div>
              {' '}
              <CustomBreadcrumb
                page={{
                  location: data?.category.name,
                  path: String(data?.category.id)
                }}
              />
            </div>
          )}

          {data && (
            <div className='grid gap-2'>
              <h2>{data.title}</h2>
              <p>€ {data.price}</p>
              <AddToCart id={data.id} />
            </div>
          )}
        </div>
      </div>

      <div className='py-12 grid md:grid-cols-2 gap-8'>
        {data && isLoggedIn && admin && (
          <UpdateProductForm product={data} feedback={feedback} />
        )}
        {data && isLoggedIn && admin && (
          <RemoveProduct id={data.id} feedback={feedback} />
        )}
      </div>
    </div>
  )
}
