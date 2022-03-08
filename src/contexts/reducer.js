export const initialState = {
  basket: [],
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return { ...state, basket: [...state.basket, action.payload] };
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (item) => item.media_type === action.media_type && item.id === action.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`${action.media_type}-${action.id} is not in basket!`);
      }

      return { ...state, basket: newBasket };
    case "SET_USER":
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export default reducer;
