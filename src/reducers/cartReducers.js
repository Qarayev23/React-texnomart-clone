import { ADD_TO_CART, INCREASE, DECREASE, REMOVE, CLEAR_CART } from "../actions/types";

const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const init = {
    cart: cartItems
}

export default function (state = init, action) {
    const { cart } = state
    switch (action.type) {
        case ADD_TO_CART:
            const check = cart.some(item => item.id === action.payload.id)
            if (!check) {
                return {
                    cart: [{ ...action.payload, count: 1 }, ...cart],
                }
            } else {
                return {
                    cart: cart.map(item => item.id === action.payload.id ?
                        { ...item, count: item.count + 1 } : item),
                }
            }

        case INCREASE:
            return {
                cart: cart.map(item => item.id === action.payload ?
                    { ...item, count: item.count + 1 } : item),
            }


        case DECREASE:
            return {
                cart: cart.map(item => item.id === action.payload ? { ...item, count: item.count - 1 } : item)
                    .filter(item => item.count !== 0),
            }


        case REMOVE:
            return {
                cart: cart.filter((item) => item.id !== action.payload),
            }

        case CLEAR_CART:
            return {
                cart: [],
            }

        default:
            return state;
    }
}
