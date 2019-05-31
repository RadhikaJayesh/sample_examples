import { combineReducers } from "redux";
import  items  from "./addReducer";

const rootReducer = combineReducers({ items });

export default rootReducer;
