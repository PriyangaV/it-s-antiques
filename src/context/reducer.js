import { REMOVE, INCREASE, DECREASE, ADDTOCART, CLEARCART } from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case REMOVE:
      // return {...state}
      return state.filter(item => item.id !== action.payload);
    case INCREASE:
      return state.map(item => {
        return item.id === action.payload
          ? { ...item, amount: item.amount + 1 }
          : { ...item };
      });
    case DECREASE:
      return state.map(item => {
        return item.id === action.payload
          ? { ...item, amount: item.amount - 1 }
          : { ...item };
      });
    case ADDTOCART:
      const { id, image, price, title } = action.payload;
      let product = { id, image, title, price, amount: 1 };
      return [...state, product];
    case CLEARCART:
      return [];
    default:
      return state;
  }
};

export default reducer;
