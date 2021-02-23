import { canvasDataType, gameDataType } from "../../../../types/data";
import { nameType } from "types/storeType";
import { Client } from "socket";
interface CanvasPropType {
	width: number;
	height: number;
	canvasData: canvasDataType;
	gameData: gameDataType;
	name: nameType;
	client: Client | null;
}

export default CanvasPropType;
