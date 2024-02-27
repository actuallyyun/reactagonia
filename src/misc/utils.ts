import { Product } from './type'

//export const getUniqueValues = (array: object[]) =>
//  array
//    .map((e) => JSON.stringify(e))
//    .filter((currentValue, index, arr) => arr.indexOf(currentValue) === index)
//    .map((e) => JSON.parse(e))

//  unique = [...new Set(list.map((o) => JSON.stringify(o)))].map((s) =>
//  JSON.parse(s)
//);
export const getCategories = (products: Product[]) => {
  return products
    .map((product) => product.category)
    .map((category) => {
      return {
        id: category.id,
        name: category.name,
        image: category.image
      }
    })
}

export const cleanImageUrl = (url: string) => {
  if (!url) {
    return null
  }
  if (url.slice(0, 5) === 'https') {
    return url
  }
  if (url.slice(0, 2) === '["') {
    return url.slice(2, url.length - 2)
  }
  return null
}