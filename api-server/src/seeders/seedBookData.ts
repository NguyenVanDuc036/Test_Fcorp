import { IndexMappingBooks } from "../index-maping/index-mapping-books";
import { client } from "../config/connection";
import { indexName } from "../utils/common";
import { IBook } from "../utils/interface/book.interface";
const bookList: IBook[] = require("../data/books.json");

export async function seeBookData() {
  try {
    const { body: exists } = await client.indices.exists({
      index: indexName["books"]
    });
    if(!exists){
      await client.indices.create({
        index: indexName["books"],
        body: {
          mappings: IndexMappingBooks
        }
      })
    }

    const { body: count } = await client.count({ index: indexName['books'] });
    if (count.count > 0) return;

    const body = bookList.flatMap((book) => [
      { index: { _index: indexName['books'] } },
      book,
    ]);
    await client.bulk({ refresh: true, body });
  } catch (error) {
    console.log(error);
  }
}
