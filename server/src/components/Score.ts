import { Server } from "socket.io";
import Round from "./Round";

class Score {
	private _scores: Record<string, number> = {};

	addPlayer = (newPlayerName: string) => {
		this._scores[newPlayerName] = 0;
	};

	updateScore = (name: string, currentRound: Round) => {
		if (!currentRound.guessedPlayers[name]) {
			this._scores[name] +=
				currentRound.scores[currentRound.availableScoreIndex];
			currentRound.incrementScoreIndex();
			currentRound.guessedPlayers[name] = true;
		}
	};

	send = (gameId: string, io: Server) => {
		io.to(gameId).emit("score-update", this._scores);
	};
}

export default Score;
