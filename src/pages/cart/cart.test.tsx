import { fireEvent, screen, waitFor } from '@testing-library/react'

import { renderWithProviders } from '../../tests/utils'
import Cart from './Cart'
import { mockServer as server, mockProducts } from '../../tests/mockServer'
import { Product } from '../../misc/type'
import userEvent from '@testing-library/user-event'

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
describe('test Cart', () => {
  test('Render component with empty cart state', () => {
    renderWithProviders(<Cart />)
    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument()
  })
  test('Uses preloaded state to render', async () => {
    renderWithProviders(<Cart />, {
      preloadedState: {
        cart: { items: initialItems }
      }
    })
    await waitFor(() => {
      const rows = screen.getAllByRole('row')
      expect(rows).toHaveLength(4)
    })
    await waitFor(() => {
      const product1: Product = mockProducts[0]
      expect(screen.getByText(product1.title)).toBeInTheDocument()
    })
  })
  test('Handle update cart item quantity', async () => {
    renderWithProviders(<Cart />, {
      preloadedState: {
        cart: { items: initialItems }
      }
    })
    await waitFor(() => {
      const quantityInput = screen.getAllByRole('spinbutton')[0]
      expect(quantityInput).toHaveAttribute(
        'value',
        initialItems[0].quantity.toString()
      )
    })
    const quantityInput = await screen.getAllByRole('spinbutton')[0]
    fireEvent.change(quantityInput, { target: { value: '9' } })
    expect(quantityInput).toHaveAttribute('value', '9')
  })
  test('Remove cart item', async () => {
    renderWithProviders(<Cart />, {
      preloadedState: {
        cart: { items: initialItems }
      }
    })

    const removeBtn = screen.getAllByRole('button', { name: 'Remove' })[0]
    fireEvent.click(removeBtn)
    const quantityInput = screen.getAllByRole('spinbutton')
    expect(quantityInput).toHaveLength(2)
    expect(
      screen.queryByRole('spinbutton', { name: mockProducts[0].title })
    ).toBeNull()
  })
  test('Clear cart button', async () => {
    renderWithProviders(<Cart />, {
      preloadedState: {
        cart: { items: initialItems }
      }
    })
    const clearBtn = screen.getByRole('button', { name: 'Clear Cart' })
    fireEvent.click(clearBtn)
    const emptyMsg = screen.getByText(/Your cart is empty/i)
    expect(emptyMsg).toBeInTheDocument()
    expect(screen.queryByText('Product name')).toBeNull()
  })
})
