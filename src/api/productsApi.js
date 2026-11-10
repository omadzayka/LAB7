const BASE_URL = 'https://dummyjson.com'

// fetch() only rejects on network failure, so a bad HTTP status must be turned into an error by hand.
async function getJson(url, signal) {
  const response = await fetch(url, { signal })
  if (!response.ok) {
    const error = new Error(
      response.status === 404 ? 'Product not found' : `Request failed (${response.status})`
    )
    error.status = response.status
    throw error
  }
  return response.json()
}

export async function fetchProducts(signal) {
  const data = await getJson(`${BASE_URL}/products?limit=100`, signal)
  return data.products
}

export function fetchProduct(id, signal) {
  return getJson(`${BASE_URL}/products/${id}`, signal)
}
