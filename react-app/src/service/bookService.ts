import { baseService } from "./baseService";
import { INetworkResponse } from "../models/common";
import { SERVICES } from "../constants/common";
import { BookModel } from "../models/bookModel";
import { BASE_API_URL } from "../config/config";

export class BookService {
  static getBookList = async (
    query?: string
  ) => {
    const url = `${BASE_API_URL}/${SERVICES.BOOK.DEFAULT}?${query || ""}`;
    return baseService.get(url);
  };

  static getBookDetail = async (
    id?: string
  ): Promise<INetworkResponse<any>> => {
    const url = `${BASE_API_URL}/${SERVICES.BOOK.DEFAULT}/${id}`;
    return baseService.get(url);
  };
}
