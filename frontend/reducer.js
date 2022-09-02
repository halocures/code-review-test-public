const initialState = {
  ownedBooks: [],
  wishlistUpdatedAt: new Date("2022-1-1"),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "addOwnedBook": {
      return {
        ...state,
        ownedBooks: [...state.ownedBooks, action.payload],
      };
    }
    case "setWishListUpdatedAt": {
      return {
        wishlistUpdatedAt: action.payload,
      };
    }
    default:
      return state;
  }
};
