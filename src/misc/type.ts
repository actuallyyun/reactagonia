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

export type CreateProductInput = {
  title: string
  price: number
  description: string
  categoryId: number
}

export type CreateProductRequest = CreateProductInput & {
  images: string[]
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

export type UserInfo = {
  id: number
  role: 'customer' | 'admin'
  name: string
  email: string
  avatar: string
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

export type UpdateProductInput = {
  title: string
  price: number
}

export type UpdateProductRequest = UpdateProductInput & { id: number }


