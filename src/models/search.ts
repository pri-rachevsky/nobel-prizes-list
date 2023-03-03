import { NobelPrize } from "./nobelPrize";

export type SearchParams = Partial<
    Pick<NobelPrize, "category" | "name" | "motivation" | "year">
>

export const initialSearchParams = {
  name: "",
  year: "",
  motivation: "",
  category: ""
};