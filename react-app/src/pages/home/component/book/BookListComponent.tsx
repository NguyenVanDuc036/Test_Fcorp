import React, { Fragment } from "react";

import { BookModel } from "../../../../models/bookModel";
import { Link } from "react-router-dom";

interface IProps {
  books?: BookModel[];
}

const BookListComponent: React.FC<IProps> = (props) => {
  const bookList = props.books;

  const renderBookList = () => {
    return bookList?.map((book, index) => (
      <div key={index} className="p-6 border border-gray-500 rounded-lg shadow dark:bg-gray-50 dark:border-gray-200">
        <a href="#">
          <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
            {book?.title}
          </p>
          <p className="mb-2 ">
            <span className="font-semibold">PublishedDate : </span>{" "}
            {book?.publishedDate}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Author : </span>{" "}
            {book?.author}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Price : </span>{" "}
            <span className="text-red-500">${book?.price}</span>
          </p>
        </a>
        <Link className="cursor-auto" to={`books/${book?.id}`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Buy
          </button>
        </Link>
      </div>
    ));
  };

  return <Fragment>{renderBookList()}</Fragment>;
};

export { BookListComponent };
