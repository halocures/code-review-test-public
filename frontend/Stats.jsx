import React from "react";
import { useSelector } from "react-redux";
import "./styles.css";

const Stats = () => {
  const ownedBooks = useSelector((state) => state.ownedBooks);

  let mostReadBook = ownedBooks[0];
  for (const book of ownedBooks) {
    if (book.reads > mostReadBook.reads) {
      mostReadBook = book;
    }
  }

  let mostOwnedAuthor = "";
  const authors = [];
  let books = 0;

  for (let i = 0; i < ownedBooks.length; i += 1) {
    if (authors.includes(ownedBooks[i].author)) {
      continue;
    }

    let counter = 0;

    for (let j = i; j < ownedBooks.length; j += 1) {
      if (ownedBooks[i].author === ownedBooks[j].author) {
        counter += 1;
      }
    }

    if (counter > books) {
      mostOwnedAuthor = ownedBooks[i].author;
    }

    authors.push(ownedBooks[i].author);
  }

  const totalReads = ownedBooks.reduce((total, current) => {
    return total + current.reads;
  }, 0);

  const hasAnyBooks = ownedBooks.length;

  return (
    <div className="container">
      <h1 className="title">Stats</h1>
      {hasAnyBooks ? (
        <div className="stats">
          <div>Total Books Owned: {hasAnyBooks}</div>
          {totalReads && <div>Total Reads: {totalReads}</div>}
          <div>Most-Owned Author: {mostOwnedAuthor}</div>
          <div>Most-Read Book: {mostReadBook.title}</div>
        </div>
      ) : (
        <div>Get some books to see your stats here!</div>
      )}
    </div>
  );
};

export default Stats;
