import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import { AutoCompletePage } from "./AutoComplete";
import { NobelPrizeService } from "../service/prize.service";
import { SearchInputs } from "../component/search/SearchInputs";
import userEvent from "@testing-library/user-event";

jest.mock("../service/prize.service");
jest.mock("../component/search/SearchInputs");

describe("AutoCompletePage", () => {
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
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("should display title and all prizes when load", async () => {
    (NobelPrizeService.readAll as jest.Mock).mockResolvedValue(prizes);
    
    act(() => render(<AutoCompletePage />));

    expect(screen.getByText("Nobel prize winners")).toBeInTheDocument();

    await waitFor(() => {
      expect(NobelPrizeService.readAll).toHaveBeenCalled();
      expect(screen.getByText(prizes[0].name)).toBeInTheDocument();
      expect(screen.getByText(prizes[1].name)).toBeInTheDocument();
      expect(screen.getByText(prizes[2].name)).toBeInTheDocument();

      expect(screen.getAllByText(prizes[0].motivation).length).toEqual(3);
      expect(screen.getAllByText(`${prizes[1].category} - ${prizes[2].year}`).length).toEqual(3);
    });
  });
  test("should call read method from service when search", async () => {
    const filter = { name: "dummy"};
    (NobelPrizeService.readAll as jest.Mock).mockResolvedValue([]);
    (NobelPrizeService.read as jest.Mock).mockResolvedValue(prizes);
    (SearchInputs as jest.Mock).mockImplementation(({ onSearch }) => <button onClick={onSearch(filter)}>search</button>);
    
    act(() => render(<AutoCompletePage />));

    const searchButton = screen.getByRole("button", { name: /Search/i });
    await act(() => userEvent.click(searchButton));
  
    await waitFor(() => {
      expect(screen.getByText(prizes[0].name)).toBeInTheDocument();
      expect(NobelPrizeService.read).toBeCalledWith(filter);
    });
  });
  test("should display message when has no prize to show", async () => {
    (NobelPrizeService.readAll as jest.Mock).mockResolvedValue([]);
    
    act(() => render(<AutoCompletePage />));

    expect(screen.getByText("No winners with those characteristics")).toBeInTheDocument();
  });
});
