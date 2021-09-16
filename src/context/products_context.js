import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import products from '../utils/products'
import { products_url as url } from '../utils/constants'
import {
  TOOGLE_SIDEBAR,
  TOOGLE_PRODUCTS_LOADING,
  RESET_PRODUCTS,
  SET_PRODUCTS,
  SET_PRODUCTS_ERROR,
  TOOGLE_PRODUCT_LOADING,
  RESET_PRODUCT,
  SET_PRODUCT,
  SET_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  isSidebarOpen: false,
  products: {
    isLoading: false,
    products: [],
    featured: [],
    error: null,
  },
  singleProduct: {
    isLoading: false,
    product: null,
    error: null,
  },
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchProducts = async (productsUrl) => {
    dispatch({ type: TOOGLE_PRODUCTS_LOADING, payload: true })
    dispatch({ type: RESET_PRODUCTS })

    try {
      const response = await axios.get(productsUrl)
      const products = response.data

      if (products && products.length > 0) {
        const featured = products.filter((product) => product.featured === true)
        dispatch({ type: SET_PRODUCTS, payload: { products, featured } })
      } else {
        dispatch({
          type: SET_PRODUCTS_ERROR,
          payload: 'Something went wrong, data not found!',
        })
      }
    } catch (error) {
      dispatch({ type: SET_PRODUCTS_ERROR, payload: error.toString() })
    } finally {
      dispatch({ type: TOOGLE_PRODUCTS_LOADING, payload: false })
    }
  }

  useEffect(() => {
    fetchProducts(url)
  }, [])

  const fetchSingleProduct = async (productUrl) => {
    dispatch({ type: TOOGLE_PRODUCT_LOADING, payload: true })
    dispatch({ type: RESET_PRODUCT })

    try {
      const response = await axios.get(productUrl)
      const product = response.data

      if (
        product &&
        typeof product === 'object' &&
        Object.keys(product).length > 0
      )
        dispatch({ type: SET_PRODUCT, payload: product })
      else
        dispatch({
          type: SET_PRODUCT_ERROR,
          payload: 'Something went wrong, data not found!',
        })
    } catch (error) {
      dispatch({ type: SET_PRODUCT_ERROR, payload: error.toString() })
    } finally {
      dispatch({ type: TOOGLE_PRODUCT_LOADING, payload: false })
    }
  }

  const toogleSidebar = (newState) =>
    dispatch({ type: TOOGLE_SIDEBAR, payload: newState })

  return (
    <ProductsContext.Provider
      value={{ ...state, toogleSidebar, fetchSingleProduct }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
