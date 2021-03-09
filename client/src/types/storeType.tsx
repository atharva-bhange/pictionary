export type nameType = string | null;
export type roomType = string | null;
export type canvasDataType = {
	isPainting: boolean;
	penSize: number;
	penColor: string;
	clear: boolean;
};

export type gameDataType = {
	id: string;
	players: string[];
	round: {
		word: string;
		drawer: string;
	};
};

interface storeType {
	name: nameType;
	room: roomType;
	game: gameDataType;
	canvas: canvasDataType;
}

export default storeType;
