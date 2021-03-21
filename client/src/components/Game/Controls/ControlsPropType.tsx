import { leaveGameActionCreator } from "types/actionCreatorTypes";
import { nameType } from "types/storeType";

interface ControlsPropType {
	name: nameType;
	leaveGame: leaveGameActionCreator;
}

export default ControlsPropType;
