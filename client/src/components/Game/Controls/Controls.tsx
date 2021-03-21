import React from "react";
import { connect } from "react-redux";

import "./Controls.scss";
import tempImg from "assets/images/avatar2.jpg";
import storeType from "types/storeType";
import ControlsPropType from "./ControlsPropType";
import socketHandler from "utils/socketHandler";
import { leaveGame } from "action/index";

const Controls: React.FC<ControlsPropType> = ({ name, leaveGame }) => {
	const onLeaveClick = () => {
		socketHandler.leaveGame();
		leaveGame();
	};

	return (
		<div className="controls-box">
			<div className="avatar">
				<img src={tempImg} alt="avatar" />
			</div>
			<div className="name">{name}</div>
			<div className="leave" onClick={onLeaveClick}>
				<i className="fas fa-sign-out-alt text-danger"></i>
			</div>
		</div>
	);
};

const mapStateToProps = (state: storeType) => {
	return {
		name: state.name,
	};
};

export default connect(mapStateToProps, { leaveGame })(Controls);
