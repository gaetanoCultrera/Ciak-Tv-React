import * as router from "react-router";
import * as redux from "react-redux";
import { useHandleOnSubmit } from "./useHandleOnSubmit";
import { renderHook } from "@testing-library/react";
import { ObjectSignupState } from "../../../store/signupSlice";

const dataFromUseSelector = {
  email: "text@mail.com",
  username: "ciccio",
  password: "Aaaaaaaa8!",
  isLogged: false,
};

const dataAuth: ObjectSignupState = {
  dataSignup: dataFromUseSelector,
};
//how to mock hook, se lo tolgo Cannot redefine property: useSelector
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
}));

const navigate = jest.fn();
const dispatch = jest.fn();
//creazione dell'elemento mock da utilizzare per implementar il risultato

const setItem = jest.spyOn(Storage.prototype, "setItem");

describe("useHandleSubmit", () => {
  test("should save user credentials and navigate to dashboard", () => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
    jest.spyOn(redux, "useDispatch").mockImplementation(() => dispatch);
    jest.spyOn(redux, "useSelector").mockReturnValue(dataAuth);

    const { result } = renderHook(() => useHandleOnSubmit());

    result.current();

    expect(setItem).toHaveBeenCalledTimes(1);

    expect(dispatch).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledTimes(1);
  });
});
