import React from "react";

import "./Controls.scss";
import tempImg from "assets/images/avatar2.jpg";

const Controls: React.FC = () => {
	return (
		<div className="controls-box">
			<div className="avatar">
				<img src={tempImg} alt="avatar" />
			</div>
			<div className="name">Athhb</div>
			<div className="leave">
				<i className="fas fa-sign-out-alt text-danger"></i>
			</div>
		</div>
	);
};

export default Controls;
