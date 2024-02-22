import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'

import { Product, CreateProductRequest } from '../misc/type'

export const mockProducts: Product[] = [
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
    },
    creationAt: '2024',
    updatedAt: '2024'
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
    },
    creationAt: '2024',
    updatedAt: '2024'
  },
  {
    id: 3,
    title: 'product2',
    price: 2,
    description: 'product2',
    images: ['img1', 'img2'],
    category: {
      id: 3,
      name: 'cloth',
      image: 'img',
      creationAt: '2024',
      updatedAt: '2024'
    },
    creationAt: '2024',
    updatedAt: '2024'
  }
]

const mockCategories = [
  {
    id: 1,
    name: 'Clothes',
    image: 'https://i.imgur.com/QkIa5tT.jpeg'
  },
  {
    id: 2,
    name: 'Electronics',
    image: 'https://i.imgur.com/ZANVnHE.jpeg'
  },
  {
    id: 3,
    name: 'Furniture',
    image: 'https://i.imgur.com/Qphac99.jpeg'
  }
]

export const handler = [
  http.get('https://api.escuelajs.co/api/v1/products', () => {
    return HttpResponse.json(mockProducts, { status: 200 })
  }),
  http.get('https://api.escuelajs.co/api/v1/categories', () => {
    return HttpResponse.json(mockCategories)
  }),
  http.get(
    'https://api.escuelajs.co/api/v1/products/:id',
    ({ request, params }) => {
      const productId = Number(params.id)
      if (productId) {
        const product = mockProducts.find((_p) => _p.id === productId)
        return HttpResponse.json(product)
      } else {
        return new HttpResponse(null, { status: 404 })
      }
    }
  )
  //http.post('https://api.escuelajs.co/api/v1/products', async ({ request }) => {
  //  const product = (await request.json()) as CreateProductRequest
  //  const createdProduct: Partial<Product> = {
  //    ...product,
  //    id: 3
  //  }
  //  return HttpResponse.json(createdProduct, { status: 201 })
  //}),
  //http.get(
  //  `https://api.escuelajs.co/api/v1/categories/:id/products`,
  //  ({ params }) => {
  //    const id = params
  //    console.log('fetching category with id' + id)
  //  }
  //)
]

export const mockServer = setupServer(...handler)
