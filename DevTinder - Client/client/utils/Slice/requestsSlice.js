import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name : "requests",
    initialState : [],
    reducers : {
        addRequests : (state , action)=>{
            return action.payload
        },
        removeRequest : (state,action)=>{
            const updatedList = state.filter((req)=>(req._id !== action.payload))
            return updatedList;
        }
    }
})

export const {addRequests , removeRequest} = requestSlice.actions;
export default requestSlice.reducer;