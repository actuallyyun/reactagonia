import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Carousel } from 'flowbite-react'

import {
  useGetSingleProductQuery,
  useDeleteProductMutation
} from '../../services/fakeStore'
import AddToCart from '../../components/cart/AddToCart'
import { AppState } from '../../app/store'
import UpdateProductForm from '../../components/product/UpdateProductForm'
import { isAdmin } from '../../components/user/userSlice'
import styles from './product.module.css'
import CustomBreadcrumb from '../../components/tailwindComponents/CustomBreadcrumb'

const RemoveProduct = ({ id }: { id: number }) => {
  const nav = useNavigate()
  const [deleteProduct, { data, error, isLoading }] = useDeleteProductMutation()
  const handleRemove = (id: number) => {
    deleteProduct(id)
  }
  if (data === true) {
    nav('/')
  }
  return <button onClick={() => handleRemove(id)}>Remove</button>
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
      <div className={styles.gridLayout}>
        <div className=''>
          {/*{data && data.images.map((img) => <img src={img} alt={data.title} />)}*/}
          {data && <ProductCarousel images={data.images} />}
        </div>
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
              {isLoggedIn && admin && <UpdateProductForm product={data} />}
              {isLoggedIn && admin && <RemoveProduct id={data.id} />}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
