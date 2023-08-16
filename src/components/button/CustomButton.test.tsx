import { render } from "@testing-library/react";
import { CustomButton } from "..";
import { CustomOption } from "./CustomButton";

jest.mock("../login/Login.tsx", () => ({
  Login: () => jest.fn(),
}));

const renderComponent = ({ optionValue, disabled, setAccount }: CustomOption) =>
  render(
    <CustomButton
      optionValue={optionValue}
      disabled={disabled}
      setAccount={setAccount}
    />
  );

describe("LoginForm", () => {
  test("renders button with correct text", () => {
    const optionValue = "mock title";
    const { getByTestId } = renderComponent({ optionValue });

    expect(getByTestId("customButton").textContent).toBe(optionValue);
  });
});
