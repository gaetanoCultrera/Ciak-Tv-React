import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "..";

// Mock useTheme

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useMediaQuery: jest.fn(),
  useTheme: jest.fn(),
}));

const renderComponent = () =>
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
describe("Navbar", () => {
  test("should render Navbar with correct image", () => {
    const { getByTestId } = renderComponent();

    expect(getByTestId("customImgNavbar").getAttribute("src")).toBe(
      "https://upload.wikimedia.org/wikipedia/commons/f/fe/Deus_ciak.png"
    );
  });

  test("should change color links when user click it", () => {
    const { getByText } = renderComponent();

    fireEvent.click(getByText("Dashboard"));
    expect(getByText("Dashboard")).toHaveStyle("color: red");

    fireEvent.click(getByText("Search"));
    expect(getByText("Search")).toHaveStyle("color: red");

    fireEvent.click(getByText("My Favorite"));
    expect(getByText("My Favorite")).toHaveStyle("color: red");
  });
  test("should open the drawer when IconButton is clicked and close when re-click", () => {
    window.matchMedia = jest.fn().mockReturnValue({
      matches: true, // Set to true to simulate mobile mode
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    });

    const { getByTestId, queryByTestId } = renderComponent();

    expect(queryByTestId("drawer")).not.toBeInTheDocument();

    fireEvent.click(getByTestId("menu"));
    expect(getByTestId("drawer")).toBeInTheDocument();

    fireEvent.click(getByTestId("customButton"));
    expect(getByTestId("menu")).toBeInTheDocument();
  });
});
//1 descrizione breve del progetto
//2 ciclo del componente con tutto quello che fa con figma o canva
//3 descrizione di ogni pagina accompagnate da uno screen sotto lo schema del progetto
