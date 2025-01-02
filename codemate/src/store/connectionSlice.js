import {createSlice} from "@reduxjs/toolkit"
import { setError } from "./requestSlice"

export const STATUSES = Object.freeze({
    IDLE: "idle",
    SUCCESS: "success",
    LOADING: "loading",
    ERROR: "error",
})

const connectionSlice = createSlice({
    name:"myConnection",
    initialState:{
        connection:[],
        status:STATUSES.IDLE,
        resError:false
    }, 
    reducers:{
        setConnection(state, action){
            state.connection = action.payload
        }, setStatus(state, action){
            state.status= action.payload
        },
        setResError(state, action){
            state.resError = action.payload
        }
    }
})

export const {setConnection, setStatus, setResError} = connectionSlice.actions
export default connectionSlice.reducer

// Thunk for all matched connection

export function getAllconnection(){
    return async function getAllconnectionThunk(dispatch, getState){
       try{
        dispatch(setStatus(STATUSES.LOADING))
        dispatch(setError(false))
        const connectionResp = await fetch("http://localhost:118/my/connection",{credentials:'include'})
        const connectionRespJson = await connectionResp.json()
        if(connectionRespJson.status==="failed"){
            dispatch(setResError(true))
            
        }
        dispatch(setConnection(connectionRespJson))
        dispatch(setStatus(STATUSES.SUCCESS))

       }catch(err){
        console.log(err.message)
        setError(true)
        setConnection(null)
        setStatus(STATUSES.ERROR)
       }

    }
}