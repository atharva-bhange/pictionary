import { combineReducers } from "redux";
import name from "./nameReducer";
import room from "./roomReducer";
import game from "./gameReducer";
import canvas from "./canvasReducer";
import online from "./onlineReducer";

export default combineReducers({
	name,
	room,
	game,
	canvas,
	online,
});
