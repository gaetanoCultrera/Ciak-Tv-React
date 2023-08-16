import { fireEvent, render } from "@testing-library/react";
import { ModalProfile } from "..";
import * as redux from "react-redux";

const selector = jest.fn();
const setHandleClose = jest.fn();

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
}));

jest.mock("./utils/useHandleProfile.ts", () => ({
  useHandleProfile: () => jest.fn(),
}));

const mockedUseSelector = jest.spyOn(redux, "useSelector");

const renderComponent = () =>
  render(<ModalProfile setHandleClose={setHandleClose} />);

describe("ModalProfileForm", () => {
  beforeEach(() => {
    mockedUseSelector.mockReturnValue(selector);
  });

  test("should render all components", () => {
    const { getByLabelText, getByTestId } = renderComponent();
    expect(getByTestId("title")).toHaveStyle({ color: "red" });
    expect(getByLabelText("oldPassword")).toBeInTheDocument();
    expect(getByLabelText("newPassword")).toBeInTheDocument();
    expect(getByLabelText("confirmPassword")).toBeInTheDocument();
    expect(getByTestId("customButton")).toBeInTheDocument();
  });

  test("should check required message", async () => {
    const { getByTestId, findByText } = renderComponent();

    fireEvent.change(getByTestId("oldPassword"), {
      target: { value: "" },
    });

    fireEvent.change(getByTestId("newPassword"), {
      target: { value: "aaaaa" },
    });

    fireEvent.blur(getByTestId("oldPassword"));

    fireEvent.blur(getByTestId("newPassword"));

    fireEvent.blur(getByTestId("confirmPassword"));

    expect(await findByText(/old password is required/)).toBeInTheDocument();
    fireEvent.change(getByTestId("oldPassword"), {
      target: { value: "a" },
    });
    expect(
      await findByText(/old Passwords must match, it's not the same/)
    ).toBeInTheDocument();
    expect(await findByText(/Must Contain 8 Characters/)).toBeInTheDocument();
    fireEvent.change(getByTestId("confirmPassword"), {
      target: { value: "a" },
    });
    expect(await findByText(/Passwords must match/)).toBeInTheDocument();
  });
});
