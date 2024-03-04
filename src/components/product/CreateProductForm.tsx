import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { Button } from 'flowbite-react'

import { CreateProductInput, Feedback } from '../../misc/type'
import {
  useGetCategoriesQuery,
  useCreateProductMutation
} from '../../services/product'
import { useSelector } from 'react-redux'
import { selectAllCategories } from '../category/categorySlice'

const defaultImage = ['https://placeimg.com/640/480/any']

const createProductSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  price: Yup.number().min(1).max(1000).required(),
  description: Yup.string()
    .min(6, 'Must be at least 6 characters')
    .max(200)
    .required('Required'),
  categoryId: Yup.number().min(1).required()
})

export default function CreateProductForm({
  feedback
}: {
  feedback: Feedback
}) {
  useGetCategoriesQuery()
  const categories = useSelector(selectAllCategories)

  const navigate = useNavigate()
  const [creatProduct] = useCreateProductMutation()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(createProductSchema)
  })
  const onSubmit = async (data: CreateProductInput) => {
    try {
      const payload = await creatProduct({
        ...data,
        images: defaultImage
      }).unwrap()
      if (payload) {
        feedback.handleSuccess('Product created successfully.')
        setTimeout(() => navigate(`/product/${payload.id}`), 2000)
      } else {
        feedback.handleError('unkown error')
      }
    } catch (err) {
      feedback.handleError(err)
    }
  }
  return (
    <div className='bg-gray-200 rounded-lg py-12 px-8 grid gap-4 dark:text-gray-900'>
      <h4 className='dark:text-gray-800'>Create a new product</h4>
      <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4 py-12'>
        <label htmlFor='title' className='dark:text-gray-800'>
          Title
        </label>
        <input {...register('title')} />
        {errors.title ? <div>{errors.title.message}</div> : null}
        <label htmlFor='price' className='dark:text-gray-800'>
          Price
        </label>
        <input {...register('price')} />
        {errors.price ? <div>{errors.price.message}</div> : null}
        <label htmlFor='categoryId' className='dark:text-gray-800'>
          Choose a category
        </label>
        <select {...register('categoryId')}>
          {categories &&
            categories.map((cat) => {
              return <option value={cat.id}>{cat.name}</option>
            })}
        </select>
        {errors.categoryId ? <div>{errors.categoryId.message}</div> : null}
        <label htmlFor='description' className='dark:text-gray-800'>
          Add a description
        </label>
        <textarea {...register('description')} />
        {errors.description ? <div>{errors.description.message}</div> : null}
        <Button type='submit' color='dark' size='lg' pill>
          Create
        </Button>
      </form>
    </div>
  )
}
