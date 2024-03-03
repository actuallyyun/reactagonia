import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from './tests/utils'
import App from './App'
import { mockServer as server } from './tests/mockServer'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('App', () => {
  test('full app rendering/navigating', async () => {
    renderWithProviders(<App />)
    const accountLink = screen.getByRole('link', { name: 'account' })
    expect(accountLink).toHaveAttribute('href', '/account')
    expect(screen.getByRole('link', { name: 'All' })).toHaveAttribute(
      'href',
      '/product'
    )
  })
  test('shop modal', async () => {
    renderWithProviders(<App />)
    const shopBtns = screen.getAllByRole('button', { name: 'Shop' })
    fireEvent.click(shopBtns[0])
    expect(screen.getAllByText('Category')).toHaveLength(2)
  })
})
