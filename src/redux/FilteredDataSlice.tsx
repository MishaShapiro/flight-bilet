import { createSlice } from "@reduxjs/toolkit"
import { Ticket } from "../App"

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

const FilteredData = createSlice({
    name: 'filteredData',
    initialState: initialState,
    reducers: {
        FilterAllTickets: (state, action) => {
            state.tickets = action.payload.tickets
        }
    }
})

export const { FilterAllTickets } = FilteredData.actions

export default FilteredData