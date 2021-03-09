import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";

import CanvasPropType from "./CanvasPropType";
import "./Canvas.scss";
import storeType from "types/storeType";
import {
	setIsPainting,
	setPenSize,
	clearCanvas,
} from "action/canvasActionCreators";

const Canvas: React.FC<CanvasPropType> = ({
	height,
	width,
	canvasData,
	gameData,
	name,
	client,
	setIsPainting,
	setPenSize,
	clearCanvas,
}) => {
	const canvas = useRef<HTMLCanvasElement | null>(null);
	const context = useRef<CanvasRenderingContext2D | null>(null);

	useEffect(() => {
		if (canvas.current) {
			context.current = canvas.current.getContext("2d");
		}
	}, []);

	useEffect(() => {
		if (canvasData.clear && context.current) {
			context.current.clearRect(0, 0, width, height);
			clearCanvas(false);
		}
	});

	const startPosition = (
		e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
	) => {
		setIsPainting(true);
		draw(e);
	};

	const finishPosition = () => {
		setIsPainting(false);
		context.current?.beginPath();
	};

	const draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		if (context.current && canvas.current && canvasData.isPainting) {
			const rect = canvas.current.getBoundingClientRect();
			let x_cor = e.clientX - rect.left;
			let y_cor = e.clientY - rect.top;
			const ctx = context.current;
			ctx.lineWidth = canvasData.penSize;
			ctx.lineCap = "round";
			ctx.lineTo(x_cor, y_cor);
			ctx.strokeStyle = canvasData.penColor;
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(x_cor, y_cor);
		}
	};

	const changeSize = (e: React.WheelEvent<HTMLCanvasElement>) => {
		if (e.deltaY < 0) {
			// wheel moving up
			const newPenSize =
				canvasData.penSize === 20 ? 20 : canvasData.penSize + 1;
			setPenSize(newPenSize);
		} else if (e.deltaY > 0) {
			// wheel moving down
			const newPenSize = canvasData.penSize === 3 ? 3 : canvasData.penSize - 1;
			setPenSize(newPenSize);
		}
	};

	return (
		<canvas
			width={width}
			height={height}
			onMouseDown={startPosition}
			onMouseUp={finishPosition}
			onMouseMove={draw}
			ref={canvas}
			onWheel={changeSize}
		></canvas>
	);
};

const mapStateToProps = (state: storeType) => {
	return {
		canvasData: state.canvas,
		gameData: state.game,
		name: state.name,
	};
};

export default connect(mapStateToProps, {
	setIsPainting,
	setPenSize,
	clearCanvas,
})(Canvas);
