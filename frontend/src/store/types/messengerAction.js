import axios from "axios";
import {
  FRIENDS_GET_SUCCESS,
  MESSAGE_GET_SUCCESS,
  MESSAGE_SEND_SUCCESS,
} from "./messengerType";
export const getFriends = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/messenger/get-friends");
      dispatch({
        type: FRIENDS_GET_SUCCESS,
        payload: {
          friends: res.data.friends,
        },
      });
    } catch (error) {
      console.log(error.res.data);
    }
  };
};

export const messageSend = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/messenger/send-message", data);
      dispatch({
        type: MESSAGE_SEND_SUCCESS,
        payload: {
          message: res.data.message,
        },
      });
    } catch (error) {
      console.log(error.res.data);
    }
  };
};

export const getAllMessage = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/messenger/get-message/${id}`);
      dispatch({
        type: MESSAGE_GET_SUCCESS,
        payload: {
          message: res.data.message,
        },
      });
    } catch (error) {
      console.log(error.res.data);
    }
  };
};

export const ImageMessageSend = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/messenger/image-message-send", data);
      dispatch({
        type: MESSAGE_SEND_SUCCESS,
        payload: {
          message: res.data.message,
        },
      });
    } catch (error) {
      console.log(error.res.data);
    }
  };
};
export const seenMessage = (msg) => async (dispatch) => {
  try {
    const res = await axios.post("/api/messenger/seen-message", msg);
    console.log(res);
  } catch (error) {
    console.log(error.res.message);
  }
};
export const updateMessage = (msg) => async (dispatch) => {
  try {
    const res = await axios.post("/api/messenger/delivared-message", msg);
    console.log(res);
  } catch (error) {
    console.log(error.response.message);
  }
  console.log(msg);
};
export const getTheme = () => async (dispatch) => {
  const theme = localStorage.getItem("theme");
  dispatch({
    type: "THEME_GET_SUCCESS",
    payload: {
      theme: theme ? theme : "white",
    },
  });
};

export const themeSet = (theme) => async (dispatch) => {
  localStorage.setItem("theme", theme);
  dispatch({
    type: "THEME_SET_SUCCESS",
    payload: {
      theme: theme,
    },
  });
};
