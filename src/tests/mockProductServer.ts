import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'

import { Product, CreateProductRequest } from '../misc/type'

const mockProducts: Partial<Product>[] = [
  {
    id: 1,
    title: 'product1',
    price: 1,
    description: 'product1',
    images: ['img1', 'img2']
  },
  {
    id: 2,
    title: 'product2',
    price: 2,
    description: 'product2',
    images: ['img1', 'img2']
  }
]

export const handler = [
  http.get('https://api.escuelajs.co/api/v1/products', () => {
    return HttpResponse.json(mockProducts, { status: 200 })
  }),
  http.post('https://api.escuelajs.co/api/v1/products', async ({ request }) => {
    const product = (await request.json()) as CreateProductRequest
    const createdProduct: Partial<Product> = {
      ...product,
      id: 3
    }
    return HttpResponse.json(createdProduct, { status: 201 })
  })
]

export const productServer = setupServer(...handler)
