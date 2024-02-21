import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'

import { useLoginMutation } from '../../services/auth'

type UserSignUpRequest = {
  email: string
  password: string
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required()
})

export default function UserLoginForm(): JSX.Element {
    const navigate = useNavigate()
    const [loginUser, { data, error, isLoading }] = useLoginMutation()

    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm({
      resolver: yupResolver(loginSchema)
    })

    const onSubmit = async (data: UserSignUpRequest) => await loginUser(data)
    console.log({ data, error })
    if (!error && data) {
      navigate('/account')
    }

  return (
    <div>
      <h1>login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('email')} />
        <input {...register('password')} />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
