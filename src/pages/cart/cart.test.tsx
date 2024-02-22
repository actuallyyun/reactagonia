import { fireEvent, screen, waitFor } from '@testing-library/react'

import { renderWithProviders } from '../../tests/utils'
import Cart from './Cart'

describe('test RemoveFromCart', () => {
  test('should render component', () => {
    renderWithProviders(<Cart />)
    expect(screen.getByText('Shopping carts')).toBeInTheDocument()
  })
  test('Uses preloaded state to render', () => {
    const initialItems = [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 },
      { productId: 3, quantity: 3 }
    ]
    renderWithProviders(<Cart />, {
      preloadedState: {
        cart: { items: initialItems }
      }
    })
  })
})
