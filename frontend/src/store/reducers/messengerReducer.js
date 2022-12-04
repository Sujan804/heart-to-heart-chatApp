import { LOGOUT_SUCCESS } from "../types/authType";
import {
  DELIVARED_MESSAGE,
  FRIENDS_GET_SUCCESS,
  MESSAGE_GET_SUCCESS_CLEAR,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_SEND_SUCCESS_CLEAR,
  NEW_USER_ADD,
  NEW_USER_ADD_CLEAR,
  SEEN_ALL,
  SEEN_MESSAGE,
  SOCKET_MESSAGE,
  THEME_GET_SUCCESS,
  THEME_SET_SUCCESS,
  UPDATE,
  UPDATE_FRIEND_MESSAGE,
} from "../types/messengerType";

const messengerState = {
  friends: [],
  message: [],
  messageSendSuccess: false,
  message_get_success: false,
  themeMood: "",
  new_user_add: "",
};
export const messengerReducer = (state = messengerState, { type, payload }) => {
  switch (type) {
    case THEME_GET_SUCCESS || THEME_SET_SUCCESS:
      return {
        ...state,
        themeMood: payload.theme,
      };
    case FRIENDS_GET_SUCCESS:
      return {
        ...state,
        friends: payload.friends,
      };
    case MESSAGE_SEND_SUCCESS:
      return {
        ...state,
        message: [...state.message, payload.message],
      };
    case SOCKET_MESSAGE:
      return {
        ...state,
        message: [...state.message, payload.message],
      };
    case UPDATE_FRIEND_MESSAGE:
      var index = state.friends.findIndex(
        (f) =>
          f.fndInfo._id === payload.msgInfo.receverId ||
          f.fndInfo._id === payload.msgInfo.senderId
      );
      state.friends[index].msgInfo = payload.msgInfo;
      state.friends[index].msgInfo.status = payload.status;
      return state;
    case MESSAGE_SEND_SUCCESS_CLEAR:
      return {
        ...state,
        messageSendSuccess: false,
      };
    case SEEN_MESSAGE:
      const index1 = state.friends.findIndex(
        (f) =>
          f.fndInfo._id === payload.msgInfo.receverId ||
          f.fndInfo._id === payload.message.senderId
      );
      state.friends[index1].msgInfo.status = "seen";
      return state;
    case DELIVARED_MESSAGE:
      const index2 = state.friends.findIndex(
        (f) =>
          f.fndInfo._id === payload.msgInfo.reseverId ||
          f.fndInfo._id === payload.msgInfo.senderId
      );
      state.friends[index2].msgInfo.status = "delivared";
      return {
        ...state,
      };
    case UPDATE:
      const index3 = state.friends.findIndex(
        (f) => f.fndInfo._id === payload.id
      );
      if (state.friends[index3].msgInfo) {
        state.friends[index3].msgInfo.status = "seen";
      }
      return state;
    case MESSAGE_GET_SUCCESS_CLEAR:
      return {
        ...state,
        message_get_success: false,
      };
    case SEEN_ALL:
      const index4 = state.friends.findIndex(
        (f) => f.fndInfo._id === payload.reseverId
      );
      state.friends[index4].msgInfo.status = "seen";
      return {
        ...state,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        friends: [],
        message: [],
        messageSendSuccess: false,
        message_get_success: false,
      };

    case NEW_USER_ADD:
      return {
        ...state,
        new_user_add: payload.new_user_add,
      };
    case NEW_USER_ADD_CLEAR:
      return {
        ...state,
        new_user_add: payload.new_user_add,
      };

    default:
      return {
        ...state,
      };
  }
};
