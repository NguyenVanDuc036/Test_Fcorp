import { AnySchema } from 'yup';

export enum DatePickerType {
  date = "date",
  month = "month",
  quarter = "quarter",
  week = "week",
  year = "year",
}

export interface INetworkResponse<Data> {
  data: Data;
  error_info?: { code: string; message: string[] };
}

export type Shape<Fields extends Record<any, any>> = {
  [Key in keyof Fields]: AnySchema;
};

