import axios from "axios";
import { USER_LOGIN_FAIL, USER_LOGIN_SUCCESS } from "..";
import {
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "../types/authType";
export const userRegiser = (data) => {
  return async (dispatch) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "/api/messeger/user-register",
        data,
        config
      );

      localStorage.setItem("authToken", response.data.token);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token,
        },
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: {
          error: error.response.data.error.errorMessage,
        },
      });
    }
  };
};

export const userLogin = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = axios.post("/api/messenger/user-login", data, config);
      localStorage.setItem("authToken", res.data.token);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: {
          response: res.data.successMessage,
          token: res.data.token,
        },
      });
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: {
          error: error.res.data.errorMessage,
        },
      });
    }
  };
};
export const userLogout = () => {
  return async (dispatch) => {
    const res = await axios.post("/api/messenger/user-logout");
    if (res.data.success) {
      localStorage.removeItem("authToken");
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    }
  };
};
