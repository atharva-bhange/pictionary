import { roomType, nameType } from "types/storeType";
import { setRoomActionCreatorType } from "types/actionCreatorTypes";

interface GamePropType {
	room: roomType;
	name: nameType;
	setRoom: setRoomActionCreatorType;
}

export default GamePropType;
