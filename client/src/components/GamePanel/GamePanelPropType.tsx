import { roomType } from "types/storeType";
import { setRoomActionCreatorType } from "types/actionCreatorTypes";

interface GamePanelPropType {
	room: roomType;
	getRandomRoom: Function;
	createRoom: (newRoom: string) => void;
	setRoom: setRoomActionCreatorType;
}

export default GamePanelPropType;
