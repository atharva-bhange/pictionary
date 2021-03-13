import React from "react";
import { connect } from "react-redux";

import "./Playerlist.scss";
import PlayerItem from "./PlayerItem";
import PlayerlistPropType from "./PlayerlistPropType";
import storeType from "types/storeType";

const Playerlist: React.FC<PlayerlistPropType> = ({ gameData }) => {
	const renderList = () => {
		if (gameData.isStarted && gameData.round) {
			const drawer = gameData.round.drawer;
			return gameData.players.map((playerName, index) => (
				<PlayerItem key={index} drawer={playerName === drawer ? true : false}>
					{playerName}
				</PlayerItem>
			));
		} else {
			return gameData.players.map((playerName, index) => (
				<PlayerItem key={index}>{playerName}</PlayerItem>
			));
		}
	};

	return (
		<div className="player-list">
			<p>Players</p>
			<div className="list-box">
				<div className="overflow-list">{renderList()}</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state: storeType) => {
	return {
		gameData: state.game,
	};
};

export default connect(mapStateToProps)(Playerlist);
