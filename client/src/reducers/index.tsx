import { combineReducers } from "redux";
import name from "./nameReducer";
import room from "./roomReducer";
import game from "./gameReducer";

export default combineReducers({
	name,
	room,
	game,
});
