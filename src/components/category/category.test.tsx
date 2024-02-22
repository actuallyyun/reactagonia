import { fireEvent, screen, waitFor } from '@testing-library/react'
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from '../../tests/utils'
import SortsByPrice from './SortByPrice'
import CategoryList from './CategoryList'
import userEvent from '@testing-library/user-event'
import { categoryReducer, InitialState, setSortMethod } from './categorySlice'
import { mockServer as server } from '../../tests/mockServer'

const initialState: InitialState = {
  sortBy: 'default',
  categories: null
}

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('test SortByPrice component', () => {
  test('should render component', async () => {
    renderWithProviders(<SortsByPrice />)
    expect(screen.getByText(/Select an option/i)).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(4)
  })
  test('should have default value selected', () => {
    renderWithProviders(<SortsByPrice />)
    const selected = screen.getByRole('option', {
      name: 'Default',
      selected: true
    })
    expect(selected).toBeInTheDocument()
  })
  test('should select correct value on change', async () => {
    const user = userEvent.setup()
    renderWithProviders(<SortsByPrice />)
    await user.selectOptions(screen.getByRole('combobox'), 'descending')
    expect(
      screen.getByRole('option', { name: 'Price(high to low)', selected: true })
    ).toBeInTheDocument()
  })
})

describe('test CategoryList component', () => {
  test('should render mock category names', async () => {
    renderWithProviders(<CategoryList />)
    expect(await screen.findAllByRole('link')).toHaveLength(3)
    expect(await screen.findByText(/Furniture/i)).toBeInTheDocument()
    expect(await screen.findByText(/Clothes/i)).toBeInTheDocument()
  })
  //test('should attach correct id to link', async () => {
  //  renderWithProviders(<CategoryList />)
  //  const electronicsLink = await screen.findByRole('link', {
  //    description: 'Electronics'
  //  })
  //  expect(electronicsLink).toHaveAttribute('href', '/category/2')
  //})
})

describe('test categorySlice', () => {
  test('should return initial state', () => {
    const state = categoryReducer(undefined, { type: '' })
    expect(state).toEqual(initialState)
  })
  test('should set sort method corretly', () => {
    const state = categoryReducer(initialState, setSortMethod('ascending'))
    expect(state.sortBy).toEqual('ascending')
  })
})
