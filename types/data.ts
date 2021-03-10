export interface gameDataType {
	id: string;
	players: string[];
	round: {
		id: number;
		word: string;
		drawer: string;
	};
}

export interface canvasDataType {
	penColor: string;
	penSize: number;
	xCor: number;
	yCor: number;
	isFinished: boolean;
	isPainting: boolean;
	clear: boolean;
}
