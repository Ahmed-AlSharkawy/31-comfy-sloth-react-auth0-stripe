import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  TOGGLE_GRID_VIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  isLoading: true,
  products: [],
  filtered: [],
  gridView: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    price: { price: 0, minPrice: 0, maxPrice: 0 },
    shipping: false,
  },
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    products: { products },
  } = useProductsContext()

  useEffect(() => {
    if (products && products.length > 0)
      dispatch({ type: LOAD_PRODUCTS, payload: products })
  }, [products])

  const toggleGridView = (gridViewState) =>
    dispatch({ type: TOGGLE_GRID_VIEW, payload: gridViewState })

  const updateSort = (e) =>
    dispatch({ type: UPDATE_SORT, payload: e.target.value })

  const updateFilters = (e) => {
    let name = e.target.name
    let value = e.target.value
    if (name === 'category') value = e.target.textContent
    if (name === 'color') value = e.target.dataset.color
    if (name === 'price') value = Number(value)
    if (name === 'shipping') value = e.target.checked

    dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
  }

  const clearFilters = () => dispatch({ type: CLEAR_FILTERS })

  useEffect(() => {
    if (!state.isLoading) {
      dispatch({ type: FILTER_PRODUCTS })
      dispatch({ type: SORT_PRODUCTS })
    }
  }, [products, state.sort, state.filters])

  return (
    <FilterContext.Provider
      value={{
        ...state,
        toggleGridView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
