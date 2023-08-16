import { render } from "@testing-library/react";
import { NavbarItem } from "./NavbarItem";
import { BrowserRouter } from "react-router-dom";

const renderComponent = () =>
  render(
    <BrowserRouter>
      <NavbarItem />
    </BrowserRouter>
  );
describe("Navbar", () => {
  test("should render Navbar with correct links", () => {
    const { getByText, getByAltText } = renderComponent();

    expect(getByText("Dashboard")).toBeInTheDocument();

    expect(getByText("Search")).toBeInTheDocument();

    expect(getByText("My Favorite")).toBeInTheDocument();

    expect(getByAltText("avatar")).toBeInTheDocument();
  });
});
