import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'

import { Product, UpdateProductInput } from '../../misc/type'
import { useUpdateProductMutation } from '../../services/fakeStore'
import { isAdmin } from '../user/userSlice'

type UpdateProductFormProp = {
  product: Product
}

export default function UpdateProductForm({ product }: UpdateProductFormProp) {
  const admin = useSelector(isAdmin)
  const { register, handleSubmit } = useForm<UpdateProductInput>({
    defaultValues: {
      title: product.title,
      price: product.price
    }
  })
  const [updateProduct, { data, error, isLoading }] = useUpdateProductMutation()
  const onSubmit = (data: UpdateProductInput) =>
    updateProduct({
      ...data,
      id: product.id
    })
  return (
    <>
      {admin && (
        <div>
          <h1>Update product</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Title</label>
            <input {...register('title')} />
            <label>Price</label>
            <input {...register('price')} />
            <button type='submit'>Update</button>
          </form>
        </div>
      )}
    </>
  )
}
