import { combineReducers } from "redux";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import blogReducer from "./blogReducer";

const rootReducer = combineReducers({
    user: userReducer,
    error: errorReducer,
    blogs: blogReducer
})

export default rootReducer;