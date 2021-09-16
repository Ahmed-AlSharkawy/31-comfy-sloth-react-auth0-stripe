import {
  LOAD_PRODUCTS,
  TOGGLE_GRID_VIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, { type, payload }) => {
  switch (type) {
    case LOAD_PRODUCTS:
      const prices = payload.map((item) => item.price)

      return {
        ...state,
        isLoading: false,
        products: [...payload],
        filtered: [...payload],
        filters: {
          ...state.filters,
          price: {
            ...state.filters.price,
            price: Math.max(...prices),
            minPrice: Math.min(...prices),
            maxPrice: Math.max(...prices),
          },
        },
      }

    case TOGGLE_GRID_VIEW:
      return { ...state, gridView: payload }

    case UPDATE_SORT:
      return { ...state, sort: payload }

    case SORT_PRODUCTS:
      console.log('hello')
      return { ...state, filtered: sortProducts(state.sort, state.filtered) }

    case UPDATE_FILTERS:
      return {
        ...state,
        filters: updateFilters(state.filters, payload.name, payload.value),
      }

    case FILTER_PRODUCTS:
      return {
        ...state,
        filtered: filterProducts(state.products, state.filters),
      }

    case CLEAR_FILTERS:
      const price = state.filters.price.maxPrice

      const filters = {
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: { ...state.filters.price, price },
        shipping: false,
      }
      return { ...state, filters }
    default:
      throw new Error(`No Matching "${type}" - action type`)
  }
}

const sortProducts = (sort, products) => {
  switch (sort) {
    case 'price-lowest':
      return products.sort((a, b) => a.price - b.price)
    case 'price-highest':
      return products.sort((a, b) => b.price - a.price)
    case 'name-a-z':
      return products.sort((a, b) => a.name.localeCompare(b.name))
    case 'name-z-a':
      return products.sort((a, b) => b.name.localeCompare(a.name))
    default:
      return products
  }
}
const updateFilters = (filters, name, value) => {
  if (name === 'price')
    return {
      ...filters,
      price: { ...filters.price, price: value },
    }

  return { ...filters, [name]: value }
}

const filterProducts = (products, filters) => {
  let filtered = [...products]
  const {
    text,
    company,
    category,
    color,
    price: { price, maxPrice },
    shipping,
  } = filters

  if (text)
    filtered = filtered.filter((item) =>
      item.name.toLowerCase().startsWith(text.toLowerCase())
    )
  if (company !== 'all')
    filtered = filtered.filter((item) => item.company === company)
  if (category !== 'all')
    filtered = filtered.filter((item) => item.category === category)
  if (color !== 'all')
    filtered = filtered.filter((item) => item.colors.includes(color))
  if (price < maxPrice)
    filtered = filtered.filter((item) => item.price <= price)
  if (shipping) filtered = filtered.filter((item) => item.shipping === true)

  return filtered
}

export default filter_reducer
