import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./pages/AutoComplete", () => ({
  AutoCompletePage: () => <>AutoCompletePage Content</>,
}));

describe("App", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("should display AutoComplete page", () => {

    render(<App />);
    expect(screen.getByText("AutoCompletePage Content")).toBeInTheDocument();
  });
});
