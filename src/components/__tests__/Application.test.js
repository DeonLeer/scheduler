import React from "react";
import axios from "axios";


import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByAltText, prettyDOM, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";

describe("Application", () => {
  afterEach(cleanup);
  //FIRST TEST
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
  
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", () => {
    const { container } = render(<Application />);
    console.log(container);
  })
});
