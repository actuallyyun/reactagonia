import { fireEvent, screen, waitFor } from '@testing-library/react'

import { renderWithProviders } from '../../tests/utils'
import Profile from './Profile'
import { mockServer as server, mockProducts } from '../../tests/mockServer'
import { Product } from '../../misc/type'
import userEvent from '@testing-library/user-event'
import { feedback } from '../products/Products.test'

beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('Profile page', () => {
  test('Should render component', () => {})
  renderWithProviders(<Profile feedback={feedback} />)
  expect(screen.getByText(/profile/i)).toBeInTheDocument()
})
