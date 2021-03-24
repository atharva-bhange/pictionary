import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import "./Controls.scss";
import storeType from "types/storeType";
import ControlsPropType from "./ControlsPropType";
import socketHandler from "utils/socketHandler";
import { leaveGame } from "action/index";

const Controls: React.FC<ControlsPropType> = ({ name, leaveGame }) => {
	const colors = useRef([
		"#00AA55",
		"#009FD4",
		"#B381B3",
		"#939393",
		"#E3BC00",
		"#D47500",
		"#DC2A2A",
	]);
	const [avatarColor, setAvatarColor] = useState(colors.current[0]);
	useEffect(() => {
		setAvatarColor(
			colors.current[Math.floor(Math.random() * colors.current.length)]
		);
	}, []);

	const onLeaveClick = () => {
		socketHandler.leaveGame();
		leaveGame();
	};

	return (
		<div className="controls-box">
			<div className="avatar">
				<span style={{ backgroundColor: avatarColor }}>{name?.charAt(0)}</span>
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
