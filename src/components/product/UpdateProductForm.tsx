import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Button } from 'flowbite-react'
import { useState,useEffect } from 'react'

import { Product, UpdateProductInput } from '../../misc/type'
import { useUpdateProductMutation } from '../../services/fakeStore'
import { isAdmin } from '../user/userSlice'
import { SuccessTooltip, FailureTooltip } from '../tailwindComponents/Tooltips'

type UpdateProductFormProp = {
  product: Product
}

export default function UpdateProductForm({ product }: UpdateProductFormProp) {
  const [status, setStatus] = useState<string>('')
  console.log({ status })
  const admin = useSelector(isAdmin)
  const { register, handleSubmit } = useForm<UpdateProductInput>({
    defaultValues: {
      title: product.title,
      price: product.price
    }
  })
  const [updateProduct, { data, error, isLoading }] = useUpdateProductMutation()
  console.log({ data })
  const onSubmit = (productInput: UpdateProductInput) => {
    updateProduct({
      ...productInput,
      id: product.id
    })

  }
  useEffect(()=>{
    if (data) {
      setStatus((prev) => (prev = 'success'))
    }
    if (error) {
      setStatus((prev) => (prev = 'failure'))
    }
  },[data,error])

  return (
    <>
      {admin && (
        <div className='grid gap-4 bg-gray-200 rounded-lg py-12 px-8'>
          <h4>Update product</h4>
          <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4'>
            <div className='flex gap-4 items-center'>
              <label>Title</label>
              <input {...register('title')} />
            </div>
            <div className='flex gap-4 items-center'>
              <label>Price</label>
              <input {...register('price')} type='number' />
            </div>
            <div className={status === 'success' ? 'block' : 'hidden'}>
              <SuccessTooltip message='Product updated successfully.' />
            </div>
            <div className={status === 'failure' ? 'block' : 'hidden'}>
              <FailureTooltip message='Product not updated successfully.' />
            </div>
            <Button type='submit' color='success' pill>
              Update
            </Button>
          </form>
        </div>
      )}
    </>
  )
}
