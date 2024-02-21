import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'

import { Product, UpdateProductInput } from '../../misc/type'
import { useUpdateProductMutation } from '../../services/fakeStore'

type UpdateProductFormProp = {
  product: Product
}

export default function UpdateProductForm({ product }: UpdateProductFormProp) {
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
      <h1>Update product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input {...register('title')} />
        <label>Price</label>
        <input {...register('price')} />
        <button type='submit'>Update</button>
      </form>
    </>
  )
}
