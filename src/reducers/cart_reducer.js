import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      return { ...state, cart: addToCart(state.cart, payload) }

    case COUNT_CART_TOTALS:
      const { totalItems, totalAmount } = state.cart.reduce(
        (totals, item) => {
          const { amount, price } = item
          totals.totalItems += amount
          totals.totalAmount += price * amount
          return totals
        },
        { totalItems: 0, totalAmount: 0 }
      )

      return { ...state, totalItems, totalAmount }

    case TOGGLE_CART_ITEM_AMOUNT:
      return { ...state, cart: toggleCartAmount(state.cart, payload) }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== payload),
      }

    case CLEAR_CART:
      return { ...state, cart: [] }

    default:
      throw new Error(`No Matching "${type}" - action type`)
  }
}

const addToCart = (cart, info) => {
  const { id, color } = info
  const cartItem = cart.find((item) => item.id === id + color)

  if (cartItem) return updateCart(cart, info)
  else return [...cart, addNewItem(info)]
}

const addNewItem = (info) => {
  const { id, color, amount, product } = info
  return {
    id: id + color,
    name: product.name,
    color,
    amount,
    image: product.images[0].url,
    price: product.price,
    max: product.stock,
  }
}

const updateCart = (cart, info) => {
  const { id, color, amount } = info
  return cart.map((item) => {
    if (item.id === id + color) {
      let newAmount = item.amount + amount
      if (newAmount > item.max) newAmount = item.max
      return { ...item, amount: newAmount }
    }
    return item
  })
}

const toggleCartAmount = (cart, { id, toggleType }) => {
  const cartItem = cart.find((item) => item.id === id)
  const { max, amount } = cartItem

  if (toggleType === 'inc') return increaseAmount(cart, id, max, amount)
  else if (toggleType === 'dec') return decreaseAmount(cart, id, amount)
}

const increaseAmount = (cart, id, max, amount) => {
  if (amount < max)
    return cart.map((item) => {
      if (item.id === id) {
        item.amount++
      }
      return item
    })

  return cart
}
const decreaseAmount = (cart, id, amount) => {
  if (amount > 1)
    return cart.map((item) => {
      if (item.id === id) {
        item.amount--
      }
      return item
    })

  return cart
}

export default cart_reducer
