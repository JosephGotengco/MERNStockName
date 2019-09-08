import axios from "axios";
import { returnErrors } from "./errorActions";
import { history } from "../App";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

// check user is admin
export const checkAdmin = () => (dispatch) => {
  
}

// load user
export const loadUser = () => (dispatch) => {
  // User loading
  dispatch({ type: USER_LOADING });
  axios
    .get("/api/auth/user")
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      history.push("/");
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Register User
export const register = ({ username, email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    username,
    email,
    password
  });

  axios
    .post("/api/users", body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// Login User
export const login = ({ username, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    username,
    password
  });

  axios
    .post("/api/auth", body, config)
    .then(res => {
      const user = res.data;
      if (user.role === "admin") {
        console.log("You are admin!");
        history.push("/admin");
      } else {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        });
        history.push("/trading");
      }
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// Logout User
export const logout = () => {
  axios.post("/api/auth/logout").then(res => {
  });
  history.push("/");
  return {
    type: LOGOUT_SUCCESS
  };
};
