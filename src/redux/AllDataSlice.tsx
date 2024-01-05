import { createSlice } from "@reduxjs/toolkit"
import { Ticket } from "../App"
import FetchTodosThunk from "./fetchTosodThunk"

interface initialStateType {
    tickets: (Ticket | {loading: true})[] | []
}

const initialState: initialStateType = {
    tickets: [
        {
            loading: true,
        }
      ]
}


const AllData = createSlice({
    name: 'allData',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(FetchTodosThunk.fulfilled, (state, action) => {
            state.tickets = action.payload.tickets
        })
        .addCase(FetchTodosThunk.rejected, () => {
            
        })
    }
})

export default AllData