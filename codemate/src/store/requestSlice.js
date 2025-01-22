import {createSlice} from "@reduxjs/toolkit"
const apiUrl = process.env.REACT_APP_API_URL;
export const STATUSES = Object.freeze({
    IDLE: "idle",
    SUCCESS: "success",
    LOADING: "loading",
    ERROR: "error",
})

const allRequestSlice = createSlice({
    name:"allRequest",
    initialState:{
        request:[],
        status:STATUSES.IDLE,
        resError:false
    },
    reducers:{
        setRequest(state, action){
            state.request = action.payload
        },
        setStatus(state, action){
            state.status = action.payload
        },
        setError(state, action){
            state.resError = action.payload
        }
    }
})
export const {setRequest, setStatus, setError} = allRequestSlice.actions
export default allRequestSlice.reducer

// Thunk for connection request 

export  function connectionRequest(){
    return async function connectionRequestThunk(dispatch, getState){
        try{
            const reqData = await fetch(`${apiUrl}/my/all/request`, {credentials: 'include',})
            const data = await reqData.json()
            if(data.status === "failed"){
                dispatch(setError(true))
            }
            dispatch(setRequest(data))
            dispatch(setStatus(STATUSES.ERROR))

        }catch(err){
            console.log(err.message)
            dispatch(setError(true))
            dispatch(setRequest(null))
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}