import { HttpStatusCode, FailedResponse, SuccessfulResponse, GetQueryParams } from "../models/httpClient";
import { NobelPrize } from "../models/nobelPrize";
import PRIZES_DATA_BANK from "./dataBank.json";

export class BackEndApi {
  public static async get(params?: GetQueryParams): Promise<SuccessfulResponse<NobelPrize> | FailedResponse> {
    if (params) {
      const error = this.validateQueryParams(params, ["keyNames", "keyValues"]);
  
      if (error) return error;
    } 

    const response: NobelPrize[] = await new Promise((resolve, reject) => {
      setTimeout(() => resolve(PRIZES_DATA_BANK as NobelPrize[]), 500);
    });
    if (params) {
      const { keyNames, keyValues } = params;
      const entity = response.filter((entity) => {
        const hasAllConditions = keyNames.every((keyName, index) => entity[keyName].includes(String(keyValues[index])));
        return hasAllConditions;
      });
      return { statusCode: HttpStatusCode.ok, body: entity };
    }
    return { statusCode: HttpStatusCode.ok, body: response };
  }

  private static validateQueryParams(
    params: object,
    requiredProperties: string[]
  ): void | FailedResponse {

    const missingPropertyError = this.validateParams(params, requiredProperties);
    if (missingPropertyError) return missingPropertyError;
  }

  private static validateParams(
    params: object,
    requiredProperties: string[],
  ): null | FailedResponse {
    const missingProperty = requiredProperties.find((property) => params[property] === undefined);
    return missingProperty
      ? this.createFailResponse(HttpStatusCode.badRequest, `${missingProperty} param is required for query`)
      : null;
  }

  private static createFailResponse(statusCode: HttpStatusCode, error: string): FailedResponse {
    return { statusCode, body: { error } };
  }
}
