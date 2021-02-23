import { combineReducers } from "redux";
import name from "./nameReducer";
import room from "./roomReducer";
import game from "./gameReducer";
import canvas from "./canvasReducer";

export default combineReducers({
	name,
	room,
	game,
	canvas,
});
