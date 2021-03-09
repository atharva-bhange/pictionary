import React from "react";
import { connect } from "react-redux";

import {
	setPenColor,
	setPenSize,
	clearCanvas,
} from "action/canvasActionCreators";
import storeType from "types/storeType";
import ColorSwatchPropType from "./ColorSwatchPropType";
import colourList from "./colourList";
import "./ColourSwatch.scss";

const ColourSwatch: React.FC<ColorSwatchPropType> = ({
	canvasData,
	setPenSize,
	setPenColor,
	clearCanvas,
}) => {
	const renderPenSizes = () => {
		const sizes = [8, 12, 16, 20];
		return (
			<div className="thickness">
				{sizes.map((size) => (
					<div
						className={`thickness-box ${
							canvasData.penSize === size ? "box-selected" : ""
						}`}
						key={size}
						onClick={() => setPenSize(size)}
					>
						<div className={`s${size} cir`}></div>
					</div>
				))}
			</div>
		);
	};

	const renderColourList = () => {
		return colourList.map((colour) => (
			<div
				key={colour}
				className="colour-pick"
				style={{ backgroundColor: colour }}
				onClick={() => setPenColor(colour)}
			/>
		));
	};

	return (
		<div className="colour-swatch">
			<div
				className="current-colour"
				style={{ backgroundColor: canvasData.penColor }}
			></div>
			<div className="colour-list">{renderColourList()}</div>
			{renderPenSizes()}
			<div className="clear">
				<i className="fas fa-trash-alt" onClick={() => clearCanvas()}></i>
			</div>
		</div>
	);
};

const mapStateToProps = (state: storeType) => {
	return {
		canvasData: state.canvas,
	};
};

export default connect(mapStateToProps, {
	setPenSize,
	setPenColor,
	clearCanvas,
})(ColourSwatch);
