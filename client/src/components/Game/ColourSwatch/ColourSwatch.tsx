import React from "react";

import "./ColourSwatch.scss";

const ColourSwatch: React.FC = () => {
	return (
		<div className="colour-swatch">
			<div className="current-colour"></div>
			<div className="colour-list">
				<div
					className="colour-pick"
					style={{ backgroundColor: "#ffffff" }}
				></div>
				<div
					className="colour-pick"
					style={{ backgroundColor: "#c1c1c1" }}
				></div>
				<div
					className="colour-pick"
					style={{ backgroundColor: "#f0130b" }}
				></div>
				<div
					className="colour-pick"
					style={{ backgroundColor: "#ff7101" }}
				></div>
				<div
					className="colour-pick"
					style={{ backgroundColor: "#ffe400" }}
				></div>
				<div
					className="colour-pick"
					style={{ backgroundColor: "#01cc00" }}
				></div>
				<div
					className="colour-pick"
					style={{ backgroundColor: "#01b2ff" }}
				></div>
				<div
					className="colour-pick"
					style={{ backgroundColor: "#2320d3" }}
				></div>
				<div
					className="colour-pick"
					style={{ backgroundColor: "#a300b9" }}
				></div>
				<div
					className="colour-pick"
					style={{ backgroundColor: "#d37ca9" }}
				></div>
				<div
					className="colour-pick"
					style={{ backgroundColor: "#000000" }}
				></div>
				<div
					className="colour-pick"
					style={{ backgroundColor: "#4c4c4c" }}
				></div>
				<div
					className="colour-pick"
					style={{ backgroundColor: "#740b07" }}
				></div>
				<div
					className="colour-pick"
					style={{ backgroundColor: "#c43701" }}
				></div>
				<div
					className="colour-pick"
					style={{ backgroundColor: "#e7a200" }}
				></div>
				<div
					className="colour-pick"
					style={{ backgroundColor: "#005511" }}
				></div>
				<div
					className="colour-pick"
					style={{ backgroundColor: "#00569f" }}
				></div>
				<div
					className="colour-pick"
					style={{ backgroundColor: "#0d0864" }}
				></div>
				<div
					className="colour-pick"
					style={{ backgroundColor: "#550068" }}
				></div>
				<div
					className="colour-pick"
					style={{ backgroundColor: "#a65575" }}
				></div>
			</div>
			<div className="thickness">
				<div className="thickness-box">
					<div className="s8 cir"></div>
				</div>
				<div className="thickness-box">
					<div className="s12 cir"></div>
				</div>
				<div className="thickness-box">
					<div className="s16 cir"></div>
				</div>
				<div className="thickness-box">
					<div className="s20 cir"></div>
				</div>
			</div>
			<div className="clear">
				<i className="fas fa-trash-alt"></i>
			</div>
		</div>
	);
};

export default ColourSwatch;
