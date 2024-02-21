import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'

import { CreateProductRequest } from '../../misc/type'
import {
  useGetCategoriesQuery,
  useCreateProductMutation
} from '../../services/fakeStore'
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

export default function CreateProductForm() {
  useGetCategoriesQuery()
  const categories = useSelector(selectAllCategories)

  const navigate = useNavigate()
  const [creatProduct, { data, error, isLoading }] = useCreateProductMutation()
  if (data && !error) {
    navigate(`/product/${data.id}`)
  }
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(createProductSchema)
  })
  const onSubmit = (data: CreateProductRequest) => {
    creatProduct({
      ...data,
      images: defaultImage
    })
  }
  return (
    <div>
      <h1>product form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='title'>Title</label>
        <input {...register('title')} />
        {errors.title ? <div>{errors.title.message}</div> : null}

        <label htmlFor='price'>Price</label>
        <input {...register('price')} />
        {errors.price ? <div>{errors.price.message}</div> : null}

        <label htmlFor='categoryId'>Id</label>
        <select {...register('categoryId')}>
          {categories &&
            categories.map((cat) => {
              return <option value={cat.id}>{cat.name}</option>
            })}
        </select>
        {errors.categoryId ? <div>{errors.categoryId.message}</div> : null}

        <label htmlFor='description'>Des</label>
        <textarea {...register('description')} />
        {errors.description ? <div>{errors.description.message}</div> : null}

        <button type='submit'>Send</button>
      </form>
    </div>
  )
}
