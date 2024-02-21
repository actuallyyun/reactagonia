import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'

import { Product, CreateProductRequest } from '../misc/type'

export const mockProducts: Partial<Product>[] = [
  {
    id: 1,
    title: 'product1',
    price: 1,
    description: 'product1',
    images: ['img1', 'img2'],
    category: {
      id: 1,
      name: 'cloth',
      image: 'img',
      creationAt: '2024',
      updatedAt: '2024'
    }
  },
  {
    id: 2,
    title: 'product2',
    price: 2,
    description: 'product2',
    images: ['img1', 'img2'],
    category: {
      id: 2,
      name: 'cloth',
      image: 'img',
      creationAt: '2024',
      updatedAt: '2024'
    }
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
  }),
  http.get(
    `https://api.escuelajs.co/api/v1/categories/:id/products`,
    ({ params }) => {
      const id = params
      console.log('fetching category with id' + id)
    }
  )
]

export const productServer = setupServer(...handler)
