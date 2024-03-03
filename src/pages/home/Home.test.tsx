import { screen } from '@testing-library/react'

import { renderWithProviders } from '../../tests/utils'
import Home from './Home'
import { mockServer as server, mockCategories } from '../../tests/mockServer'

beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('Home', () => {
  test('should render mock cateogries card', async () => {
    renderWithProviders(<Home />)
    expect(screen.getByText(/shop by categories/i)).toBeInTheDocument()
    expect(
      await screen.findByAltText(mockCategories[0].name, { exact: false })
    ).toBeInTheDocument()
    expect(
      await screen.findByAltText(mockCategories[1].name, { exact: false })
    ).toBeInTheDocument()
    expect(
      await screen.findByAltText(mockCategories[2].name, { exact: false })
    ).toBeInTheDocument()
  })
})
