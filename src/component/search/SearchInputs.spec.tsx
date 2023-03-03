import React from "react";
import { act, render, screen } from "@testing-library/react";
import { SearchInputs } from "./SearchInputs";
import userEvent from "@testing-library/user-event";

describe("SearchInputs", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("should display inputs", () => {
    render(<SearchInputs onSearch={() => {}} />);

    expect(screen.getByLabelText("Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Year:")).toBeInTheDocument();
    expect(screen.getByLabelText("Motivation:")).toBeInTheDocument();
    expect(screen.getByText("Category:")).toBeInTheDocument();

    expect(screen.getByLabelText("None")).toBeInTheDocument();
    expect(screen.getByLabelText("Physics")).toBeInTheDocument();
    expect(screen.getByLabelText("Chemistry")).toBeInTheDocument();
    expect(screen.getByLabelText("Medicine")).toBeInTheDocument();
    expect(screen.getByLabelText("Literature")).toBeInTheDocument();
    expect(screen.getByLabelText("Peace")).toBeInTheDocument();

    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  test("should call on search with the filters values", async () => {
    const searchSpy = jest.fn();
    render(<SearchInputs onSearch={searchSpy} />);

    const nameInput = screen.getByLabelText("Name:");
    const yearInput = screen.getByLabelText("Year:");
    const searchButton = screen.getByRole("button", { name: /Search/i });
    await act(async () => {
      userEvent.type(nameInput, "name");
      userEvent.type(yearInput, "22");
      await userEvent.click(searchButton);
    });

    expect(searchSpy).toBeCalledWith({name: "name", year: "22", motivation: "", category: ""});
  });
});
