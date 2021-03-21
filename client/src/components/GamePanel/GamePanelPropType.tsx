import { nameType, onlineType, roomType } from "types/storeType";
import { setRoomActionCreatorType } from "types/actionCreatorTypes";

interface GamePanelPropType {
	room: roomType;
	name: nameType;
	online: onlineType;
	getRandomRoom: Function;
	createRoom: (newRoom: string) => void;
	setRoom: setRoomActionCreatorType;
}

export default GamePanelPropType;
