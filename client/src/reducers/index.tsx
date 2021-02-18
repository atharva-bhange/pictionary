import { combineReducers } from "redux";
import name from "./nameReducer";
import room from "./roomReducer";

export default combineReducers({
	name,
	room,
});
