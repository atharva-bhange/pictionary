import { roomType } from "types/storeType";

interface GamePanelPropType {
	room: roomType;
	getRandomRoom: Function;
	createRoom: (newRoom: string) => void;
}

export default GamePanelPropType;
