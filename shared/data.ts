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

export interface clientMessageDataType {
	name: string;
	message: string;
}

export interface serverMessageResponseDataType {
	sender: string;
	isGuessed: boolean;
	message: string | null;
}

export type scoresDataType = Record<string, number>;

export interface randomGameResultType {
	game: string | null;
}
