import { cleanImageUrl, generateRandomImage } from './utils'

describe('clean image url', () => {
  test('should return original url', () => {
    const url = 'https://placeimg.com/640/480/any?r=0.591926261873231'
    expect(cleanImageUrl(url)).toBe(url)
  })
  test('should return cleaned url', () => {
    const url = '["https://placeimg.com/640/480/any?r=0.591926261873231"]'
    expect(cleanImageUrl(url)).toBe(
      'https://placeimg.com/640/480/any?r=0.591926261873231'
    )
  })
  test('should return null on no r', () => {
    const url1 = '["https://placeimg.com/640/480/any"]'
    expect(cleanImageUrl(url1)).toBe(null)
    const url2 = 'https://placeimg.com/640/480/any'
    expect(cleanImageUrl(url2)).toBe(null)
  })

  test('should return null', () => {
    const url1 = ''
    expect(cleanImageUrl(url1)).toBe(null)
    const url2 = 'somerandomstring'
    expect(cleanImageUrl(url2)).toBe(null)
  })
})

describe('generate random image', () => {
  test('should return valid image url', () => {
    const res = generateRandomImage()
    expect(res.slice(0, 5)).toBe('https')
    expect(res.includes('id')).toBeTruthy()
  })
})
