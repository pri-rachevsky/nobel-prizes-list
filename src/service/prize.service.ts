import { BackEndApi } from "../mockBackEnd/backEndApi";
import { ErrorBody, HttpStatusCode } from "../models/httpClient";
import { NobelPrize } from "../models/nobelPrize";

export class NobelPrizeService {
  public static async readAll(): Promise<NobelPrize[]> {
    const { body, statusCode } = await BackEndApi.get();

    if (statusCode === HttpStatusCode.ok) return body as NobelPrize[];
    throw new Error((body as ErrorBody).error);
  }
  public static async read(query: {[keyName: string]: string}): Promise<NobelPrize[]> {
    const keyNames = [];
    const keyValues = [];
    Object.entries(query).forEach(([key, value]) => {
      if (value) {
        keyNames.push(key);
        keyValues.push(value);
      }
    });
    const queryForMockedBackEnd = { keyNames, keyValues };

    const { body, statusCode } = await BackEndApi.get(queryForMockedBackEnd);

    if (statusCode === HttpStatusCode.ok) return body as NobelPrize[];
    throw new Error((body as ErrorBody).error);
  }
}
