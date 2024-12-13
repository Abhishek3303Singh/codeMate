import { createSlice } from "@reduxjs/toolkit";
export const STATUSES = Object.freeze({
  IDLE: "idle",
  SUCCESS: "success",
  LOADING: "loading",
  ERROR: "error",
});

const userProfileSlice = createSlice({
  name: "profileData",
  initialState: {
    user: {},
    status: STATUSES.IDLE,
    resError: false,
    isCreated: false,
  },
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setProfile(state, action) {
      state.user = action.payload;
    },
    setError(state, action) {
      state.resError = action.payload;
    },
    setIsCreated(state, action) {
      state.isCreated = action.payload;
    },
  },
});

export const { setStatus, setProfile, setError, setIsCreated } =
  userProfileSlice.actions;

export default userProfileSlice.reducer;

// thunk for create Profile

export function createProfile(formData) {
  return async function createProfileThunk(dispatch, getState) {
    // dispatch(setInitializeState());
    dispatch(setStatus(STATUSES.LOADING));
    dispatch(setIsCreated(false));
    dispatch(setError(false));
    console.log(formData, "formdata")
    try {
      let profileResponse = await fetch("http://localhost:118/profile", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      console.log(profileResponse, "data");
      const data = await profileResponse.json();
    
      dispatch(setProfile(data));
      if (profileResponse.ok && data.status === "success") {
        dispatch(setIsCreated(true));
      } else {
        dispatch(setError(true));
        dispatch(setIsCreated(false));
      }
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
      dispatch(setProfile(null));
      dispatch(setIsCreated(false));
      dispatch(setError(true));
    }
  };
}

// GET MY Profile
export function myProfile() {
  return async function myProfileThunk(dispatch, getState) {
    // dispatch(setInitializeState());
    // console.log("my profile running")
    dispatch(setStatus(STATUSES.LOADING));
 
    dispatch(setError(false));

    try {
      let myProfileResponse = await fetch("http://localhost:118/my/profile",{ credentials: "include",});
      const data = await myProfileResponse.json();
      console.log(data, "my profile data")
    
      dispatch(setProfile(data));
      if (myProfileResponse.ok && data.status === "success") {
        dispatch(setIsCreated(true));
      } else {
        dispatch(setError(true));
        dispatch(setIsCreated(false));
      }
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
      dispatch(setProfile(null));
      dispatch(setIsCreated(false));
      dispatch(setError(true));
    }
  };
}

export function clearErr() {
  return function clearErrThunk(dispatch, getState) {
    dispatch(setError(false));
    dispatch(setProfile(null));
  };
}
export function resetCreated() {
  return function resetCreatedThunk(dispatch, getState) {
    dispatch(setIsCreated(false));
    // dispatch(setProduct(null))
  };
}
