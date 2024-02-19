import { Product } from '../../misc/type'
import { fetchProducts, productReducer, InitialState } from './productSlice'

const initialState: InitialState = {
  products: [],
  status: 'idle',
  error: null,
  selectedProduct: null
}

describe('Test product reducer', () => {
  let mockProducts: Product[] = [
    {
      id: 4,
      title: 'Handmade Fresh Table',
      price: 687,
      description: 'Andy shoes are designed to keeping in...',
      category: {
        id: 5,
        name: 'Others',
        image: 'https://placeimg.com/640/480/any?r=0.591926261873231',
        creationAt: '2023-01-03T16:51:33.000Z',
        updatedAt: '2023-01-03T16:51:33.000Z'
      },
      images: [
        'https://placeimg.com/640/480/any?r=0.9178516507833767',
        'https://placeimg.com/640/480/any?r=0.9300320592588625',
        'https://placeimg.com/640/480/any?r=0.8807778235430017'
      ],
      creationAt: '2023-01-03T16:51:33.000Z',
      updatedAt: '2023-01-03T16:51:33.000Z'
    },
    {
      id: 19,
      title: 'Sleek Wireless Headphone & Inked Earbud Set',
      price: 443,
      description:
        'Experience the fusion of style and sound with this sophisticated audio set featuring a pair of sleek, white wireless headphones offering crystal-clear sound quality and over-ear comfort. The set also includes a set of durable earbuds, perfect for an on-the-go lifestyle. Elevate your music enjoyment with this versatile duo, designed to cater to all your listening needs.',
      images: [
        'https://i.imgur.com/yVeIeDa.jpeg',
        'https://i.imgur.com/jByJ4ih.jpeg',
        'https://i.imgur.com/KXj6Tpb.jpeg'
      ],
      creationAt: '2024-02-19T00:47:20.000Z',
      updatedAt: '2024-02-19T05:07:29.000Z',
      category: {
        id: 2,
        name: 'Electronics',
        image: 'https://i.imgur.com/ZANVnHE.jpeg',
        creationAt: '2024-02-19T00:47:20.000Z',
        updatedAt: '2024-02-19T00:47:20.000Z'
      }
    }
  ]
  test('Should return initial state', () => {
    const state = productReducer(undefined, { type: '' })
    expect(state).toEqual(initialState)
  })
  //test fulfill
  test('Should return mock products', () => {
    const state = productReducer(
      initialState,
      fetchProducts.fulfilled(mockProducts, 'fulfilled')
    )
    expect(state).toEqual({
      products: mockProducts,
      error: null,
      selectedProduct: null,
      status: 'succeeded'
    })
  })
  test('Should return loading status', () => {
    const state = productReducer(initialState, fetchProducts.pending('pending'))
    expect(state).toEqual({
      products: [],
      error: null,
      selectedProduct: null,
      status: 'loading'
    })
  })
  test('Should return error', () => {
    const error = new Error('rejected error')
    const state = productReducer(
      initialState,
      fetchProducts.rejected(error, 'rejected error')
    )
    expect(state).toEqual({
      products: [],
      error: 'rejected error',
      selectedProduct: null,
      status: 'failed'
    })
  })
})
