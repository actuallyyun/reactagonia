import { fireEvent, screen, waitFor } from '@testing-library/react'

import { renderWithProviders } from '../../tests/utils'
import Cart from './Cart'
import { mockServer as server } from '../../tests/mockServer'

beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

const initialItems = [
  { productId: 1, quantity: 2 },
  { productId: 2, quantity: 1 },
  { productId: 3, quantity: 3 }
]
describe('test RemoveFromCart', () => {
  test('Render component with empty cart state', () => {
    renderWithProviders(<Cart />)
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
  })
  test('Uses preloaded state to render', () => {
    renderWithProviders(<Cart />, {
      preloadedState: {
        cart: { items: initialItems }
      }
    })
  })
})
