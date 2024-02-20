import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'

import { UserRegister } from '../../misc/type'
import { useRegisterMutation } from '../../services/auth'

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
  console.log({ data })
  if (!error && data) {
    nagivate('/login')
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
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='name'>Username</label>
        <input {...register('name')} />
        {errors.name ? <div>{errors.name.message}</div> : null}
        <label htmlFor='email'>Email</label>
        <input {...register('email')} placeholder='email' />
        {errors.email ? <div>{errors.email.message}</div> : null}
        <label htmlFor='password'>password</label>
        <input {...register('password')} placeholder='password' />
        {errors.password ? <div>{errors.password.message}</div> : null}
        <label htmlFor='avatar'>avatar</label>
        <input {...register('avatar')} placeholder='avatar' />
        {errors.avatar ? <div>{errors.avatar.message}</div> : null}
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default UserRegisterForm
