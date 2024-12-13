import { createSlice } from "@reduxjs/toolkit";
export const STATUSES = Object.freeze({
  IDLE: "idle",
  SUCCESS: "success",
  LOADING: "loading",
  ERROR: "error",
});

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feed: [],
    status: STATUSES.IDLE,
    resError: false,
  },
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setFeed(state, action) {
      state.feed = action.payload;
    },
    setError(state, action) {
      state.resError = action.payload;
    },
  },
});

export const { setStatus, setFeed, setError } = feedSlice.actions;
export default feedSlice.reducer;

//   Feed Thunk Logic

export function feedData(currentPage) {
  return async function feedDataThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    dispatch(setError(false));
    try{
      console.log(currentPage, 'page')
        const feedResponse = await fetch(`http://localhost:118/feed?page=${currentPage}`,{credentials: 'include',})

        const data = await feedResponse.json()
        dispatch(setFeed(data))
        if(data.status==="failed"){
           dispatch(setError(true))
        }else{
           dispatch(setError(false))
        }
        dispatch(setStatus(STATUSES.SUCCESS))

    }catch(err){
        console.log(err.message)
        dispatch(setFeed(null))
        dispatch(setError(true))
        dispatch(setStatus(STATUSES.IDLE))
    }
  };
}
