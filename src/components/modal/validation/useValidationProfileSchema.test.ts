import { useValidationProfileSchema } from "./useValidationProfileSchema";
import * as redux from "react-redux";
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

const mockedUseSelector = jest.spyOn(redux, "useSelector");

describe("ValidationSchema", () => {
  test("validates schema with correct data", async () => {
    const { oldPassword, newPassword, confirmPassword } = {
      oldPassword: "Aaaaaaaa8!",
      newPassword: "Bbbbbbbb8!",
      confirmPassword: "Bbbbbbbb8!",
    };

    const mockData = {
      password: "Aaaaaaaa8!",
    };

    mockedUseSelector.mockReturnValue(mockData);
    const handleValidation = useValidationProfileSchema();
    await expect(
      handleValidation.validate({ oldPassword, newPassword, confirmPassword })
    ).resolves.toBeTruthy();
  });
  test("validates schema with wrong data on field", async () => {
    const { oldPassword, newPassword, confirmPassword } = {
      oldPassword: "Aaaaaaaa8!",
      newPassword: "Bbbbbbbb8!",
      confirmPassword: "Bbbbbbbb8!",
    };

    const mockData = {
      password: "Aaaaaa8!",
    };

    mockedUseSelector.mockReturnValue(mockData);
    const handleValidation = useValidationProfileSchema();
    await expect(
      handleValidation.validate({ oldPassword, newPassword, confirmPassword })
    ).rejects.toBeTruthy();
  });
});
