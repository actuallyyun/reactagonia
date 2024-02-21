export type Category = {
  id: number
  name: string
  image: string
  creationAt: string
  updatedAt: string
}

export type Product = {
  id: number
  title: string
  price: number
  description: string
  images: string[]
  creationAt: string
  updatedAt: string
  category: Category
}

export type UserRegister = {
  name: string
  email: string
  password: string
  avatar: string
}

export type User = UserRegister & {
  role: 'customer' | 'admin'
  id: number
}

export type UserAuthToken = {
  access_token: string
  refresh_token: string
}

export type UserLoginRequest = {
  email: string
  password: string
}

export type CartItem = {
  productId: number
  quantity: number
}

export type Cart = {
  item: CartItem
  totalQuantity: number
}