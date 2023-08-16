import { render, fireEvent } from "@testing-library/react";
import { SignUp } from "..";
import * as router from "react-router";

jest.mock("./utils/useHandleSignUp.ts", () => ({
  useHandleSignUp: () => jest.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
}));

const navigate = jest.fn();

const mockedUseNavigation = jest.spyOn(router, "useNavigate");

const renderComponent = () => render(<SignUp />);
//TODO perchè non si validano nonostante sia uguale
describe("SignUpForm", () => {
  beforeEach(() => {
    mockedUseNavigation.mockImplementation(() => navigate);
  });

  test("should front image", () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId("customImg").getAttribute("src")).toBe(
      "https://www.fwisd.org/cms/lib/TX01918778/Centricity/Domain/6965/2023-Register.png"
    );
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

    fireEvent.change(getByTestId("password"), {
      target: { value: "aaaaa" },
    });

    fireEvent.change(getByTestId("confirmPassword"), {
      target: { value: "a" },
    });

    fireEvent.blur(getByTestId("username"));

    fireEvent.blur(getByTestId("email"));

    fireEvent.blur(getByTestId("password"));

    fireEvent.blur(getByTestId("confirmPassword"));

    expect(await findByText(/Enter a valid email/)).toBeInTheDocument();
    expect(await findByText(/Username is required/)).toBeInTheDocument();
    expect(await findByText(/Must Contain 8 Characters/)).toBeInTheDocument();
    expect(await findByText(/Passwords must match/)).toBeInTheDocument();
  });
});
