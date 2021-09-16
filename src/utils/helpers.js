export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100)
}

export const getUniqueValues = (products, prop) => {
  let uniqueValues = products.map((product) => product[prop])
  if (prop === 'colors') uniqueValues = uniqueValues.flat()
  return ['all', ...new Set(uniqueValues)]
}
