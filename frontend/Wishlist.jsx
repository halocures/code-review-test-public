import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addOwnedBook, setWishListUpdatedAt } from "./actions.js";
import axios from "axios";
import "./styles.js";

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [theme, setTheme] = useState("");

  const inputsAllSpacesRef = useRef(false);

  const { id } = useSelector((state) => state.user);
  const wishlistUpdatedAt = useSelector((state) => state.wishlistUpdatedAt);

  const dispatch = useDispatch();

  useEffect(async () => {
    // If both inputs contain non-empty strings consisting of all spaces,
    // user can press escape to reset them
    const handleKeypress = (e) => {
      if (inputsAllSpacesRef.current && e.keyCode === 27) {
        setTitle("");
        setAuthor("");
      }
    };

    document.addEventListener("keyup", handleKeypress);

    const wishlist = await axios.get("/wishlist", {
      user_id: id,
    });

    setItems(wishlist);
    setTheme("normal");
  }, []);

  useEffect(() => {
    if (title.length && !title.trim() && author.length && !author.trim()) {
      inputsAllSpacesRef.current = true;
    } else {
      inputsAllSpacesRef.current = false;
    }
  }, [title, author]);

  const handleRemove = async (r) => {
    const removedItem = await axios.delete(`/wishlist_items/${r}`);

    const updatedList = items.filter((item) => item !== removedItem);

    dispatch(setWishListUpdatedAt());
    setItems(updatedList);
  };

  const markAsOwned = (book) => {
    addOwnedBook(book);
    handleRemove(book.id);
  };

  const handleSubmit = async () => {
    const addedItem = await axios.post("/wishlist_items", {
      user_id: id,
      title,
      author,
    });

    dispatch(setWishListUpdatedAt());
    setItems(items.push(addedItem));
  };

  return (
    <div className="container" style={{ backgroundColor: theme === "normal" ? "white" : "black" }}>
      <h1 className="title">My Wishlist</h1>
      <div>
        {items.map((item) => (
          <div key={item.author} className="wishlist-item">
            <div>
              "{item.title}" by {item.author}
            </div>
            <button
              type="button"
              onClick={() => markAsOwned(item)}
              className="button wishlist-button"
            >
              I Own This
            </button>
            <button
              type="button"
              onClick={() => handleRemove(item)}
              className="button wishlist-button"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="button" className="button">
          Submit
        </button>
        {inputsAllSpacesRef.current && <div className="hint">Press escape to clear the fields</div>}
      </form>
      <div className="hint">{wishlistUpdatedAt}</div>
    </div>
  );
};

export default Wishlist;
