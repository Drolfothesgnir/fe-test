import http from './http'

export default async function getProducts(query: string = '') {
  const { data, headers } = await http.get<Shop.Product[]>(`/api/shop/products?${query}`);
  return {
    products: data,
    total: headers['x-total-count'] || data.length
  }
}

export async function getBrands() {
  const { data } = await http.get<string[]>('/api/shop/brands');
  return data
}

export async function getColors() {
  const { data } = await http.get<string[]>('/api/shop/colors');
  return data
}

export async function getPriceRange(): Promise<[number, number]> {
  const min = (await getProducts('_sort=price&_order=asc&_limit=1')).products[0].price;
  const max = (await getProducts('_sort=price&_order=desc&_limit=1')).products[0].price;
  
  return [min, max]
}