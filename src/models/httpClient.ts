import { NobelPrize } from "./nobelPrize";

/* eslint-disable @typescript-eslint/no-explicit-any */
export enum HttpStatusCode {
  ok = 200,
  badRequest = 400,
}
export type ErrorBody = { error: string }
export type FailedResponse = { statusCode: HttpStatusCode; body: ErrorBody };
export type SuccessfulResponse<T = NobelPrize> = { statusCode: HttpStatusCode; body: T[] };

export type GetQueryParams = { keyNames: Array<keyof NobelPrize>; keyValues: Array<number | string> }
