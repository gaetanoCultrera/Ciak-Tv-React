import { fireEvent, render } from "@testing-library/react";
import { Login } from "..";
import * as router from "react-router";
import * as redux from "react-redux";

const navigate = jest.fn();
const selector = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

const mockedUseSelector = jest.spyOn(redux, "useSelector");

const mockedUseNavigation = jest.spyOn(router, "useNavigate");

jest.mock("./utils/useHandleOnSubmit.ts", () => ({
  useHandleOnSubmit: () => jest.fn(),
}));

const renderComponent = () => render(<Login />);

describe("LoginForm", () => {
  beforeEach(() => {
    mockedUseNavigation.mockImplementation(() => navigate);
    mockedUseSelector.mockReturnValue(selector);
  });

  test("should render all components", () => {
    const { getByLabelText, getByTestId } = renderComponent();
    expect(getByTestId("customImg").getAttribute("src")).toBe(
      "https://themetrust.com/wp-content/uploads/2018/04/custom_login_cover.jpg"
    );
    expect(getByTestId("title")).toHaveStyle({ color: "red" });
    expect(getByLabelText("email")).toBeInTheDocument();
    expect(getByLabelText("password")).toBeInTheDocument();
    expect(getByTestId("customButton")).toBeInTheDocument();
  });

  test("should check if button is disabled on mount", () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId("customButton")).toBeDisabled();
  });
  test("should display validation error messagges ", async () => {
    const { getByTestId, findByText } = renderComponent();

    fireEvent.change(getByTestId("email"), {
      target: { value: "invalid_email" },
    });

    fireEvent.blur(getByTestId("email"));

    fireEvent.blur(getByTestId("password"));

    expect(await findByText(/email must be the same/)).toBeInTheDocument();
    expect(await findByText(/Password is required/)).toBeInTheDocument();
  });
});
