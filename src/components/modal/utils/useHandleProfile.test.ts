import * as redux from "react-redux";
import { useHandleProfile } from "./useHandleProfile";
import { renderHook } from "@testing-library/react";
import { IFormProfile } from "../../../interfaces/IFormAuth";

const dataFromForm: Pick<IFormProfile, "newPassword"> = {
  newPassword: "Aaaaaaaa8!",
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
}));

const dispatch = jest.fn();
const setHandleClose = () => jest.fn();

const setItem = jest.spyOn(Storage.prototype, "setItem");

describe("useHandleProfile", () => {
  test("should change user credentials ", () => {
    const password = "Aaaaaaaa8!";
    const mockWindowConfirm = jest
      .spyOn(window, "confirm")
      .mockImplementation(() => true);
    jest.spyOn(redux, "useDispatch").mockImplementation(() => dispatch);
    jest.spyOn(redux, "useSelector").mockReturnValue(password);

    const { result } = renderHook(() => useHandleProfile(setHandleClose));

    result.current(dataFromForm, {
      setSubmitting: jest.fn(),
      resetForm: jest.fn(),
    });

    expect(mockWindowConfirm).toHaveBeenCalledTimes(1);

    expect(setItem).toHaveBeenCalledTimes(1);

    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
