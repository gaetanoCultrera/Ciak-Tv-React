import * as router from "react-router";
import * as redux from "react-redux";
import { useHandleSignUp } from "./useHandleSignUp";
import { renderHook } from "@testing-library/react";
import { Route } from "../../../constans/Route";

interface DataFromUseSelector {
  email: string;
  password: string;
  username: string;
}

const userData: DataFromUseSelector = {
  email: "test@example.com",
  password: "Aaaaaaaa8!",
  username: "Ciccio",
};
//how to mock hook, se lo tolgo Cannot redefine property: useSelector
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
}));
const navigate = jest.fn();
const dispatch = jest.fn();
//creazione dell'elemento mock da utilizzare per implementar il risultato
const mockedUseNavigation = jest.spyOn(router, "useNavigate");
const mockedUseDispatch = jest.spyOn(redux, "useDispatch");

const setItem = jest.spyOn(Storage.prototype, "setItem");

describe("useHandleSignUp ", () => {
  test("should save user credentials and navigate to dashboard", () => {
    mockedUseNavigation.mockImplementation(() => navigate);
    mockedUseDispatch.mockImplementation(() => dispatch);
    const { result } = renderHook(() => useHandleSignUp());

    result.current(userData);

    expect(setItem).toHaveBeenCalledTimes(1);

    expect(dispatch).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(Route.DASHBOARD);
  });
});
