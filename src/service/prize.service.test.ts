import { BackEndApi } from "../mockBackEnd/backEndApi";
import { HttpStatusCode } from "../models/httpClient";
import { NobelPrizeService } from "./prize.service";

jest.mock("../mockBackEnd/backEndApi");

describe("NobelPrizeService", () => {
  const prizes = [{
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
  },
  {
    id: "1023",
    name: "Philip Dybvig",
    motivation: "for research on banks and financial crises",
    share: "3",
    year: "2022",
    category: "economics"
  }];
  describe("readAll", () => {
    it("should call get BackEndApi rightly and return prizes when success", async () => {
      (BackEndApi.get as jest.Mock).mockResolvedValue({ statusCode: HttpStatusCode.ok, body: prizes });
      const result = await NobelPrizeService.readAll();
      expect(BackEndApi.get).toHaveBeenCalledWith();
      expect(result).toStrictEqual(prizes);
    });
    it("should throw error when the statusCode is not 200", async () => {
      (BackEndApi.get as jest.Mock).mockResolvedValue({
        statusCode: HttpStatusCode.badRequest,
        body: { error: "unexpected" }
      });
      await expect(NobelPrizeService.readAll()).rejects.toThrowError("unexpected");
    });
  });
  describe("read", () => {
    it("should call get BackEndApi rightly and return prizes when success", async () => {
      (BackEndApi.get as jest.Mock).mockResolvedValue({ statusCode: HttpStatusCode.ok, body: prizes });
      const result = await NobelPrizeService.read({ year: "2022", category: "economics", somethingElse: null });
      expect(BackEndApi.get).toHaveBeenCalledWith({ keyNames: ["year", "category"], keyValues: ["2022", "economics"] });
      expect(result).toStrictEqual(prizes);
    });
    it("should throw error when the statusCode is not 200", async () => {
      (BackEndApi.get as jest.Mock).mockResolvedValue({
        statusCode: HttpStatusCode.badRequest,
        body: { error: "unexpected" }
      });
      await expect(NobelPrizeService.read({ year: "2022", category: "economics"})).rejects.toThrowError("unexpected");
    });
  });
});
