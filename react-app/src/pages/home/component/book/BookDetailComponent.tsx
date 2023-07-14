import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { QUERIES } from '../../../../constants/query';
import { useQuery } from '@tanstack/react-query';
import { BookService } from '../../../../service/bookService';
import { Comments } from './Comments';


const BookDetailComponent: React.FC<{}> = () => {
    const { id } = useParams();
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const orderDetail = useQuery([QUERIES.BOOK_DETAIL, id], () => BookService.getBookDetail(id), {
        cacheTime: 0,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    }).data;

    const bookDetail = orderDetail?.data.result;

    return (
        <div className="px-20 py-10">

            <div className="w-full p-10 m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray dark:border-gray-300">
                <div className="grid grid-cols-2 gap-6">
                    <div><img className="p-8 rounded-t-lg" src="https://picsum.photos/250/350?grayscale" alt="product image" /></div>
                    <div className="mt-5" >
                        <p className="mb-2 "> <span className="font-semibold" >PublishedDate : </span> {bookDetail?.publishedDate}</p>
                        <p className="mb-2"><span className="font-semibold" >publishedDate : </span> {bookDetail?.author}</p>
                        <p className="mb-2"><span className="font-semibold" >Price : </span> <span className="text-red-500">${bookDetail?.price}</span></p>
                        <p className="mb-2"><span className="font-semibold" >Description : </span> {bookDetail?.description}</p>
                    </div>
                </div>
                <div className="px-5 pb-5">
                    <a href="#">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
                    </a>
                    <div className=" mt-2.5 mb-5">
                        <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{bookDetail?.title}</h6>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
                        <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                    </div>
                </div>
                <Comments bookId={id!}/>
            </div>

        </div>
    );
};

export { BookDetailComponent };
