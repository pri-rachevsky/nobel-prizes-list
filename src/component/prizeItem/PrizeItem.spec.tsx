import React from "react";
import { render, screen } from "@testing-library/react";
import { PrizeItem } from "./PrizeItem";

describe("PrizeItem", () => {
  const prize = {
    id: "1023",
    name: "Philip Dybvig",
    motivation: "for research on banks and financial crises",
    share: "3",
    year: "2022",
    category: "economics"
  };
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("should display prize props", () => {
    render(<PrizeItem prize={prize} highlight={{}} />);

    expect(screen.getByText(prize.name)).toBeInTheDocument();
    expect(screen.getByText(prize.motivation)).toBeInTheDocument();
    expect(screen.getByText(`${prize.category} - ${prize.year}`)).toBeInTheDocument();
  });
  test("should highlight substring", () => {
    render(<PrizeItem prize={prize} highlight={{ motivation: "research" }} />);

    screen.logTestingPlaygroundURL();
    expect(screen.getByText(prize.name)).toBeInTheDocument();
    expect(screen.getByText("research")).toBeInTheDocument();
    expect(screen.getByText("for on banks and financial crises")).toBeInTheDocument();
    expect(screen.getByText(`${prize.category} - ${prize.year}`)).toBeInTheDocument();
  });
});
