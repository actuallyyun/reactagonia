import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { authApi, useLoginMutation } from '../../services/auth'
import { Label, TextInput, Button } from 'flowbite-react'
import store from '../../app/store'
import { Feedback } from '../../misc/type'

type UserSignUpRequest = {
  email: string
  password: string
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required')
})

export default function UserLoginForm({
  feedback
}: {
  feedback: Feedback
}): JSX.Element {
  const [loginUser] = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit = async (req: UserSignUpRequest) => {
    try {
      const payload = await loginUser(req).unwrap()
      if (payload) {
        try {
          const { error } = await store.dispatch(
            authApi.endpoints.getUser.initiate()
          )
          if (error) {
            feedback.handleError(error)
          } else {
            feedback.handleSuccess('Login successful.')
          }
        } catch (err) {
          feedback.handleError(err)
        }
      }
    } catch (err) {
      feedback.handleError(err)
    }
  }

  return (
    <div className='grid gap-8'>
      <h1>Log in.</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4'>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='email' value='Your email' />
          </div>
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
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='password' value='Your password' />
          </div>
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
        </div>

        <Button type='submit' gradientDuoTone='purpleToPink'>
          Login
        </Button>
      </form>
    </div>
  )
}
