import { createSlice } from "@reduxjs/toolkit";



const initialState = { 
    initialData: [],
}

const blogSlice = createSlice({
    name: 'blogSlice',
    initialState,
    reducers: {
        setBlog(state, action) {
            console.log(action, "api data..")
            state.initialData = action.payload
            console.log("New reducer State: ", state.initialData)
        }
    },
});

export const { setBlog } = blogSlice.actions
export default blogSlice.reducer;
