import { fireEvent, screen, waitFor } from '@testing-library/react'

import { mockServer as server } from '../../tests/mockServer'
import store from '../../app/store'
import fakeStoreApi from '../../services/fakeStore'
import { renderWithProviders } from '../../tests/utils'
import Products from './Products'
import { Feedback } from '../../misc/type'

beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

const feedback: Feedback = {
  handleSuccess: jest.fn(),
  handleError: jest.fn()
}

const setUp = async () => {
  const utils = renderWithProviders(<Products feedback={feedback} />)

  const searchBtn = (await screen.findByLabelText(
    'product-search-button'
  )) as HTMLButtonElement

  const searchInput = (await screen.findByLabelText(
    'product-search-input'
  )) as HTMLInputElement
  const searchForm = await screen.findByRole('search')
  //  const prevBtn = screen.getByRole('button', { value: { text: 'previous' } })
  const frioProduct = await screen.findByText(/frio/i)
  const juegosProduct = await screen.findByText(/Juegos/i)

  return {
    searchBtn,
    searchInput,
    searchForm,
    juegosProduct,
    frioProduct,
    ...utils
  }
}

describe('Products', () => {
  test('should render components', async () => {
    const { searchBtn, searchInput, frioProduct, juegosProduct, searchForm } =
      await setUp()

    expect(searchForm).toBeInTheDocument()
    expect(searchBtn).toBeInTheDocument()
    expect(searchInput).toBeInTheDocument()
    expect(frioProduct).toBeInTheDocument()
    expect(juegosProduct).toBeInTheDocument()
  })
  test('Search should set query params corretly', async () => {
    const { searchInput, searchBtn, juegosProduct, frioProduct } = await setUp()
    expect(searchInput.value).toBe('')
    fireEvent.change(searchInput, { target: { value: 'frio' } })
    expect(searchInput.value).toBe('frio')
    fireEvent.click(searchBtn)
    expect(frioProduct).toBeInTheDocument()
    await waitFor(() => {
      expect(juegosProduct).not.toBeInTheDocument()
    })
  })
})
