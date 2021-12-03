import { combineReducers } from "redux";
import blogSlice from "../features/blog/blogSlice";

const reducer = combineReducers({
    blogSlice : blogSlice,
})


export default reducer