import axios from "axios";

import {
    USERS_LOADING,
    USERS_LOADED
} from './types';


export const getUsers = () => dispatch => {
    dispatch({ type: USERS_LOADING });
    axios.get('/api/admin/users')
    .then(res => {
        dispatch({ type: USERS_LOADED, payload: res.data.users })
    }, err => {
        console.log(err);
    });
}

// TEMPORARY FUNCTION REMOVE AFTER
export const login = () => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    username: 'admin',
    password: 'admin'
  });

    axios
    .post("/api/auth", body, config)
    .then(res => console.log('logged in as admin'));
}