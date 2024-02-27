import { cleanImageUrl } from './utils'

describe('clean image url', () => {
  test('should return original url', () => {
    const url = 'https://placeimg.com/640/480/any'
    expect(cleanImageUrl(url)).toBe(url)
  })
  test('should return cleaned url', () => {
    const url = '["https://placeimg.com/640/480/any"]'
    expect(cleanImageUrl(url)).toBe('https://placeimg.com/640/480/any')
  })
  test('should return null', () => {
    const url1 = ''
    expect(cleanImageUrl(url1)).toBe(null)
    const url2 = 'somerandomstring'
    expect(cleanImageUrl(url2)).toBe(null)
  })
})
