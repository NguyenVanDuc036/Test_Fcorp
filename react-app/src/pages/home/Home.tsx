import { useQuery } from "@tanstack/react-query";
import { QUERIES } from "../../constants/query";
import { BookService } from "../../service/bookService";
import { BookListComponent } from "./component/book/BookListComponent";

export default function Home() {

 const { isFetching, data, isLoading, refetch } = useQuery(
    [QUERIES.BOOK_LIST],
    () => BookService.getBookList(),
    { cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false }
  );

  const books = data?.data?.result?.list;

    return (
        <div className="p-20 grid grid-cols-4 gap-10">
            <BookListComponent books={books} />
        </div>

    );
}
