import deCodeToken from "jwt-decode";
import {
  ERROR_CLEAR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SUCCESS_MESSAGE_CLEAR,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
} from "..";
import { LOGOUT_SUCCESS } from "../types/authType";
const authState = {
  loading: true,
  authenticate: false,
  error: "",
  successMessage: "",
  myInfo: "",
};

const tokenDecode = (token) => {
  const tokenDecoded = deCodeToken(token);
  const expTime = new Date(tokenDecoded.exp * 1000);

  if (new Date() > expTime) {
    return null;
  }
  return tokenDecoded;
};

const getToken = localStorage.getItem("authToken");
if (getToken) {
  const getInfo = tokenDecode(getToken);
  if (getToken) {
    authState.myInfo = getInfo;
    authState.authenticate = true;
    authState.loading = false;
  }
}

export const authReducer = (state = authState, { type, payload }) => {
  switch (type) {
    case REGISTER_FAIL || USER_LOGIN_FAIL:
      return {
        ...state,
        error: payload,
        authenticate: false,
        myInfo: "",
        loading: true,
      };
    case REGISTER_SUCCESS || USER_LOGIN_SUCCESS:
      return {
        ...state,
        myInfo: tokenDecode(payload.token),
        successMessage: payload.successMessage,
        error: "",
        authenticate: true,
        loading: false,
      };
    case SUCCESS_MESSAGE_CLEAR:
      return {
        ...state,
        successMessage: "",
      };
    case ERROR_CLEAR:
      return {
        ...state,
        error: "",
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        authenticate: false,
        myInfo: "",
        successMessage: "Logout successfull",
      };
    default:
      return state;
  }
};
