import React from "react";

import "./PlayerItem.scss";
import PlayerItemPropType from "./PlayerItemPropType";

const PlayerItem: React.FC<PlayerItemPropType> = ({
	children,
	drawer = false,
}) => {
	return (
		<div className="player-item">
			<div>{children}</div>
			{drawer ? (
				<div>
					<i className="fas fa-pencil-alt"></i>
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default PlayerItem;
