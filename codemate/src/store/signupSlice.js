import { createSlice } from "@reduxjs/toolkit";
const apiUrl = process.env.REACT_APP_API_URL;
export const STATUSES = Object.freeze({
  IDLE: "idle",
  SUCCESS: "success",
  LOADING: "loading",
  ERROR: "error",
});

const signupSlice = createSlice({
  name: "signupUser",
  initialState: {
    user: {},
    status: STATUSES.IDLE,
    isAuthenticated: false,
    resError: false,
  },
  reducers: {
    // setInitializeState(state){
    //     state.status = STATUSES.LOADING,
    //     state.isAuthenticated = false,
    //     state.resError= false
    // },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setAuthentication(state, action) {
      state.isAuthenticated = action.payload;
    },
    setError(state, action) {
      state.resError = action.payload;
    },
  },
});

export const { setStatus, setAuthentication, setUser, setError } =
  signupSlice.actions;

export default signupSlice.reducer;

// thunk for signup

export function signup(firstName, lastName,email, password) {
  return async function signupThunk(dispatch, getState) {
    // dispatch(setInitializeState());
    dispatch(setStatus(STATUSES.LOADING));
    dispatch(setAuthentication(false));
    dispatch(setError(false));
    try {
      let signupResponse = await fetch(`${apiUrl}/signup`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }),
      });

      const data = await signupResponse.json();
      // console.log(data, "data");
      dispatch(setUser(data));
      if (signupResponse.ok && data.status === "success") {
        dispatch(setAuthentication(true));
      } else {
        dispatch(setError(true));
        dispatch(setAuthentication(false));
      }
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (err) {
      console.log(err.message);
      dispatch(setStatus(STATUSES.ERROR));
      dispatch(setUser(null));
      dispatch(setAuthentication(false));
      dispatch(setError(true));
    }
  };
}

//   LOGIN THUNK

export function login(email, password) {
  return async function loginThunk(dispatch, getState) {
    // dispatch(setInitializeState());
    dispatch(setStatus(STATUSES.LOADING));
    dispatch(setAuthentication(false));
    dispatch(setError(false));
    try {
      let loginResponse = await fetch(`${apiUrl}/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await loginResponse.json();
      // console.log(data, "data");
      dispatch(setUser(data));
      if (loginResponse.ok && data.status === "success") {
        dispatch(setAuthentication(true));
      } else {
        dispatch(setError(true));
        dispatch(setAuthentication(false));
      }
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (err) {
      console.log(err.message);
      dispatch(setStatus(STATUSES.ERROR));
      dispatch(setUser(null));
      dispatch(setAuthentication(false));
      dispatch(setError(true));
    }
  };
}

//   Get User

export function getUser() {
  return async function getUserThunk(dispatch, getState) {
    // dispatch(setInitializeState());
    dispatch(setStatus(STATUSES.LOADING));
    dispatch(setAuthentication(false));
    dispatch(setError(false));
    try {
      let userResponse = await fetch(`${apiUrl}/get/user`, {
        credentials: "include",
      });

      const data = await userResponse.json();
      // console.log(data, 'data')
      dispatch(setUser(data));
      if (userResponse.ok && data.status === "success") {
        dispatch(setAuthentication(true));
      } else {
        dispatch(setError(true));
        dispatch(setAuthentication(false));
      }
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (err) {
      console.log(err.message);
      dispatch(setStatus(STATUSES.ERROR));
      dispatch(setUser(null));
      dispatch(setAuthentication(false));
      dispatch(setError(true));
    }
  };
}
// logout user
export function logout() {
  return async function logoutThunk(dispatch, getState) {
    // dispatch(setInitializeState());
    dispatch(setStatus(STATUSES.LOADING));
    dispatch(setAuthentication(false));
    dispatch(setError(false));
    try {
      let userResponse = await fetch(`${apiUrl}/logout`,{credentials: 'include',});

      const data = await userResponse.json();
      // console.log(data, 'data')
      dispatch(setUser(data));
      if (userResponse.ok && data.status === "success") {
        dispatch(setAuthentication(false));
      } else {
        dispatch(setError(true));
        dispatch(setAuthentication(false));
      }
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (err) {
      console.log(err.message);
      dispatch(setStatus(STATUSES.ERROR));
      dispatch(setUser(null));
      dispatch(setAuthentication(false));
      dispatch(setError(true));
    }
  };
}

export function clearErr() {
  return function clearErrThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.IDLE));
    dispatch(setUser(null));
    dispatch(setAuthentication(false));
  };
}
