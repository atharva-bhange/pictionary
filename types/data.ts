export interface gameDataType {
	id: string;
	players: string[];
	round: {
		word?: string;
		drawer: string;
	};
}
