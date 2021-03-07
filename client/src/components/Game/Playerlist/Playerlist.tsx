import React from "react";

import "./Playerlist.scss";
import PlayerItem from "./PlayerItem";

const Playerlist: React.FC = () => {
	return (
		<div className="player-list">
			<p>Players</p>
			<div className="list-box">
				<div className="overflow-list">
					<PlayerItem>Athhb</PlayerItem>
					<PlayerItem>Athhb</PlayerItem>
					<PlayerItem>Athhb</PlayerItem>
					<PlayerItem drawer>Athhb</PlayerItem>
					<PlayerItem>Athhb</PlayerItem>
					<PlayerItem>Athhb</PlayerItem>
					<PlayerItem>Athhb</PlayerItem>
					<PlayerItem drawer>Athhb</PlayerItem>
					<PlayerItem>Athhb</PlayerItem>
					<PlayerItem>Athhb</PlayerItem>
					<PlayerItem>Athhb</PlayerItem>
					<PlayerItem>Athhb</PlayerItem>
					<PlayerItem>Athhb</PlayerItem>
					<PlayerItem>Athhb</PlayerItem>

					<PlayerItem>Athhb</PlayerItem>
					<PlayerItem>Athhb</PlayerItem>
					<PlayerItem>Athhb</PlayerItem>
				</div>
			</div>
		</div>
	);
};

export default Playerlist;
