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

const products_reducer = (state, action) => {
  switch (action.type) {
    // reducing sidebar
    case TOOGLE_SIDEBAR:
      return { ...state, isSidebarOpen: action.payload }

    // reducing products
    case TOOGLE_PRODUCTS_LOADING:
      return {
        ...state,
        products: { ...state.products, isLoading: action.payload },
      }

    case RESET_PRODUCTS:
      return {
        ...state,
        products: {
          ...state.products,
          products: [],
          featured: [],
          error: null,
        },
      }

    case SET_PRODUCTS:
      const { products, featured } = action.payload
      return { ...state, products: { ...state.products, products, featured } }

    case SET_PRODUCTS_ERROR:
      return {
        ...state,
        products: { ...state.products, error: action.payload },
      }

    // reducing single product
    case TOOGLE_PRODUCT_LOADING:
      return {
        ...state,
        singleProduct: { ...state.singleProduct, isLoading: action.payload },
      }

    case RESET_PRODUCT:
      return {
        ...state,
        singleProduct: {
          ...state.singleProduct,
          product: null,
          error: null,
        },
      }

    case SET_PRODUCT:
      return {
        ...state,
        singleProduct: { ...state.singleProduct, product: action.payload },
      }

    case SET_PRODUCT_ERROR:
      return {
        ...state,
        singleProduct: { ...state.singleProduct, error: action.payload },
      }

    // reducing non reduced actions
    default:
      throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export default products_reducer
