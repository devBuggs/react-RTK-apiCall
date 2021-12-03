import api from "./api";
import { BASE_URL } from "./url_config";

import { setBlog } from "../features/blog/blogSlice";

import { useDispatch } from "react-redux";


export const fetchDataApiCall = () =>async dispatch => {
    
    api.get(BASE_URL)
        .then(response => {
            console.log("api response:", response.data);
            return dispatch(setBlog(response.data))
        })
};
