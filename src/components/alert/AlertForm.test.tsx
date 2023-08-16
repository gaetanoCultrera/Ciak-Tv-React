import { render } from "@testing-library/react";
import { AlertForm } from "./AlertForm";

jest.mock("../modal/ModalProfile.tsx", () => ({
  ModalProfile: () => jest.fn(),
}));

describe("alert", () => {
  test("should render given string from props ", () => {
    const optionValue = "mock option value";
    const { getByTestId } = render(<AlertForm message={optionValue} />);

    expect(getByTestId("customAlert").textContent).toBe(optionValue);
  });
});
