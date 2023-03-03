import { HttpStatusCode } from "../models/httpClient";
import { BackEndApi } from "./backEndApi";
import PRIZES_DATA_BANK from "./dataBank.json";

describe("BackEndApi", () => {
  const prize = {
    id: "1023",
    name: "Philip Dybvig",
    motivation: "for research on banks and financial crises",
    share: "3",
    year: "2022",
    category: "economics"
  };
  const otherColleagues = [{
    id: "1021",
    name: "Ben Bernanke",
    motivation: "for research on banks and financial crises",
    share: "3",
    year: "2022",
    category: "economics"
  },
  {
    id: "1022",
    name: "Douglas Diamond",
    motivation: "for research on banks and financial crises",
    share: "3",
    year: "2022",
    category: "economics"
  }];
  describe("Get", () => {
    it("should return all prizes when has no query params", async () => {
      const result = await BackEndApi.get();

      expect(result).toStrictEqual({
        statusCode: HttpStatusCode.ok,
        body: PRIZES_DATA_BANK
      });
    });
    it("should return 200 and prize which matches with query params", async () => {
      const result = await BackEndApi.get({
        keyNames: ["id", "name"],
        keyValues: [1023, "Phil"]
      });

      expect(result).toStrictEqual({
        statusCode: HttpStatusCode.ok,
        body: [prize]
      });
    });
    it("should return 200 and all prizes which matches with query params", async () => {
      const result = await BackEndApi.get({
        keyNames: ["motivation"],
        keyValues: ["for research on banks and financial crises"]
      });

      expect(result).toStrictEqual({
        statusCode: HttpStatusCode.ok,
        body: [ ...otherColleagues, prize]
      });
    });
    it("should return 200 and empty array when not found any entity with that key", async () => {
      const result = await BackEndApi.get({ keyNames: ["id"], keyValues: ["99999"] });

      expect(result).toStrictEqual({
        statusCode: HttpStatusCode.ok,
        body: []
      });
    });
    it("should return 400 when it has query params without keyNames", async () => {
      // @ts-expect-error: Let's ignore a compile error to make possible test this case
      const result = await BackEndApi.get({ keyValues: ["1023"] });

      expect(result).toStrictEqual({
        statusCode: HttpStatusCode.badRequest,
        body: { error: "keyNames param is required for query" }
      });
    });
    it("should return 400 when it has query params without keyValues", async () => {
      // @ts-expect-error: Let's ignore a compile error to make possible test this case
      const result = await BackEndApi.get({ keyNames: ["id"] });

      expect(result).toStrictEqual({
        statusCode: HttpStatusCode.badRequest,
        body: { error: "keyValues param is required for query" }
      });
    });
  });
});
