import { configureStore } from "@reduxjs/toolkit"
import AllData from "./AllDataSlice"
import FilteredData from "./FilteredDataSlice"

export const store = configureStore({
    reducer: {
        allData: AllData.reducer,
        filteredData: FilteredData.reducer,
    }
})