import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Carousel, Button } from 'flowbite-react'
import { useState, useEffect } from 'react'

import {
  useGetSingleProductQuery,
  useDeleteProductMutation
} from '../../services/fakeStore'
import AddToCart from '../../components/cart/AddToCart'
import { AppState } from '../../app/store'
import UpdateProductForm from '../../components/product/UpdateProductForm'
import { isAdmin } from '../../components/user/userSlice'
import CustomBreadcrumb from '../../components/tailwindComponents/CustomBreadcrumb'
import {
  SuccessTooltip,
  FailureTooltip
} from '../../components/tailwindComponents/Tooltips'

const RemoveProduct = ({ id }: { id: number }) => {
  const [status, setStatus] = useState<string>('')

  const nav = useNavigate()
  const [deleteProduct, { data, error }] = useDeleteProductMutation()
  const handleRemove = (id: number) => {
    deleteProduct(id)
  }
  useEffect(() => {
    if (data) {
      setStatus((prev) => (prev = 'success'))
      setTimeout(() => nav('/'), 2000)
    }
    if (error) {
      setStatus((prev) => (prev = 'failure'))
    }
  }, [data, error])

  return (
    <div className='grid gap-4  bg-gray-200 rounded-lg py-12 px-8'>
      <h4>Remove product</h4>
      <p>
        Once the product is removed, you will not be able to access it any more.
      </p>
      <div className={status === 'success' ? 'block' : 'hidden'}>
        <SuccessTooltip message='Product removed successfully.' />
      </div>
      <div className={status === 'failure' ? 'block' : 'hidden'}>
        <FailureTooltip message='Product not removed successfully.' />
      </div>
      <Button onClick={() => handleRemove(id)} color='warning' pill>
        Remove
      </Button>
    </div>
  )
}

function ProductCarousel({ images }: { images: string[] }) {
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

export default function SingleProductPage() {
  const admin = useSelector(isAdmin)
  const { productId } = useParams()

  const { data, error, isLoading } = useGetSingleProductQuery(Number(productId))
  const { isLoggedIn } = useSelector((state: AppState) => state.user)

  return (
    <div className='container mx-auto px-4 md:px-16 py-16'>
      <div className='grid md:grid-cols-2 gap-8'>
        <div>{data && <ProductCarousel images={data.images} />}</div>
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
          {!data && (
            <div>
              <p>The product you are looking for does not exist.</p>
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
        {data && isLoggedIn && admin && <UpdateProductForm product={data} />}
        {data && isLoggedIn && admin && <RemoveProduct id={data.id} />}
      </div>
    </div>
  )
}
