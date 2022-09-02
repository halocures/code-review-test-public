export const addOwnedBook = (book) => {
  return async (dispatch) => {
    const response = await axios.post("/owned_books", {
      book,
    });

    dispatch({
      type: "addOwnedBook",
      payload: response.data.book,
    });

    return response.data.book;
  };
};

export const setWishListUpdatedAt = () => ({
  type: "setWishListUpdatedAt",
  payload: new Date(),
});
