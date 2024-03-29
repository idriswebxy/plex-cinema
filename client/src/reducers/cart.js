import {
  ADD_TO_CART,
  LOAD_CART,
  CART_ERROR,
  DELETE_ITEM,
  PRICE_TOTAL,
  GUEST_CART_ADD,
  GUEST_CART_LOAD,
  DELETE_GUEST_MOVIE,
  GUEST_PRICE_TOTAL
} from "../actions/types";

const initialState = {
  guestCart: [],
  cart: [],
  totalPrice: 0.0,
  guestTotal: 0.0,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, payload],
      };
    case GUEST_CART_ADD:
      return {
        ...state,
        guestCart: [...state.guestCart, payload.movie],
        guestTotal: state.guestTotal + payload.price,
      };
    case GUEST_CART_LOAD:
      return {
        ...state,
        guestCart: [...state.guestCart.map((m) => m)],
        loading: false,
      };
    case GUEST_PRICE_TOTAL:
      return {
        ...state,
        ...state.guestTotal
      }  
    case DELETE_GUEST_MOVIE:
      return {
        ...state,
        guestCart: state.guestCart.filter((m) => m.id !== payload.id),
        guestTotal: state.guestTotal - payload.price,
      };
    case LOAD_CART:
      return {
        ...state,
        cart: payload,
        loading: false,
      };
    case PRICE_TOTAL:
      return {
        ...state,
        totalPrice: 0.0,
        totalPrice: payload,
      };
    case DELETE_ITEM:
      return {
        ...state,
        cart: state.cart.filter((item) => item.index !== payload.index),
        totalPrice: state.totalPrice - payload.price,
      };
    case CART_ERROR:
      return {
        ...state,
        cart: state.cart,
      };
    default:
      return state;
  }
}
