import { useValidationSchema } from "./useValidationSchema";
import * as redux from "react-redux";
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

const mockedUseSelector = jest.spyOn(redux, "useSelector");

describe("ValidationSchema", () => {
  test("validates schema with correct data", async () => {
    const { email, password } = {
      email: "test@example.com",
      password: "Aaaaaaaa8!",
    };

    const mockData = {
      email: "test@example.com",
      password: "Aaaaaaaa8!",
    };

    mockedUseSelector.mockReturnValue(mockData);
    const handleValidation = useValidationSchema();
    await expect(
      handleValidation.validate({ email, password })
    ).resolves.toBeTruthy();
  });
  test("validates schema with wrong data on field", async () => {
    const { email, password } = {
      email: "test",
      password: "Aaaaaa",
    };

    const mockData = {
      email: "test@example.com",
      password: "Aaaaaaaa8!",
    };

    mockedUseSelector.mockReturnValue(mockData);
    const handleValidation = useValidationSchema();
    await expect(
      handleValidation.validate({ email, password })
    ).rejects.toBeTruthy();
  });
});
