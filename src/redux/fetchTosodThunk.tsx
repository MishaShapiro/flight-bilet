import { createAsyncThunk } from "@reduxjs/toolkit";

const FetchTodosThunk = createAsyncThunk(
    'todos/FetchTodosThunk',
    async () => {
        const res = await fetch("/flights")
        const data = await res.json()
        return data
    }
)

export default FetchTodosThunk