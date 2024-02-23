import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { Label, TextInput, Button } from 'flowbite-react'

import { UserRegister } from '../../misc/type'
import { useRegisterMutation } from '../../services/auth'
import {
  ShowLoading,
  handleFetchBaseQueryError,
  ShowFeedback
} from '../utils/feedback'

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Must be at least 6 characters')
    .max(16, 'Must be shorter than 16 characters')
    .required('Required'),
  avatar: Yup.string()
    .url()
    .required('Required')
    .default('https://picsum.photos/800')
})

const UserRegisterForm: React.FC<{}> = () => {
  const nagivate = useNavigate()

  const [addUser, { data, error, isLoading }] = useRegisterMutation()

  if (!error && data) {
    setTimeout(() => nagivate('/login'), 3000)
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SignupSchema)
  })
  const onSubmit = (data: UserRegister) => {
    addUser(data)
  }

  return (
    <div className='grid gap-8'>
      <h1>Create an Account.</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='grid'>
        <Label htmlFor='name' value='Username' />
        <TextInput
          {...register('name')}
          placeholder='Username'
          color={errors.name ? 'failure' : ''}
          helperText={
            <>
              {errors.name && (
                <span className='font-medium'>{errors.name.message}</span>
              )}
            </>
          }
        />
        <Label htmlFor='email' value='Email' />
        <TextInput
          {...register('email')}
          placeholder='email'
          color={errors.email ? 'failure' : ''}
          helperText={
            <>
              {errors.email && (
                <span className='font-medium'>{errors.email.message}</span>
              )}
            </>
          }
        />
        <Label htmlFor='password' value='password' />
        <TextInput
          {...register('password')}
          placeholder='password'
          color={errors.password ? 'failure' : ''}
          helperText={
            <>
              {errors.password && (
                <span className='font-medium'>{errors.password.message}</span>
              )}
            </>
          }
        />
        <Label htmlFor='avatar' value='avatar' />
        <TextInput
          {...register('avatar')}
          placeholder='avatar'
          color={errors.avatar ? 'failure' : ''}
          helperText={
            <>
              {errors.avatar && (
                <span className='font-medium'>{errors.avatar.message}</span>
              )}
            </>
          }
        />
        {error && handleFetchBaseQueryError(error)}
        {isLoading && <ShowLoading />}
        {!isLoading && data && (
          <ShowFeedback
            state='success'
            message='Sign up successfully. You will be redirected to login page.'
          />
        )}
        <p>
          Please read our Privacy Notice for how we process your personal data
          and how you can exercise your privacy rights.
        </p>
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Create Account
        </Button>
      </form>
    </div>
  )
}

export default UserRegisterForm
