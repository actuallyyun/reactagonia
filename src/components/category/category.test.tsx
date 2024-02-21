import { http, HttpResponse, delay } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, screen } from '@testing-library/react'
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from '../../tests/utils'
import SortsByPrice from './SortByPrice'

export const handlers = [
  http.get('https://api.escuelajs.co/api/v1/categories/:id', async () => {
    await delay(150)
    return HttpResponse.json('John Smith')
  })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())
test('should render component', async () => {
  renderWithProviders(<SortsByPrice />)
  expect(screen.getByText(/Select an option/i)).toBeInTheDocument()
})
