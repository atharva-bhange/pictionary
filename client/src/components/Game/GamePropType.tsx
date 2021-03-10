import { roomType, nameType, gameDataType } from "types/storeType";
import { setRoomActionCreatorType } from "types/actionCreatorTypes";

interface GamePropType {
	room: roomType;
	name: nameType;
	gameData: gameDataType;
	setRoom: setRoomActionCreatorType;
}

export default GamePropType;
