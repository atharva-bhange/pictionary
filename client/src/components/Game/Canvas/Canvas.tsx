import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";

import CanvasPropType from "./CanvasPropType";
import "./Canvas.scss";
import storeType from "types/storeType";
import {
	setIsPainting,
	setPenSize,
	clearCanvas,
	setIsFinished,
	setCoordinate,
} from "action/canvasActionCreators";

const Canvas: React.FC<CanvasPropType> = ({
	height,
	width,
	canvasData,
	gameData,
	name,
	setIsPainting,
	setPenSize,
	clearCanvas,
	setIsFinished,
	setCoordinate,
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
		if (canvasData.isPainting && canvas.current && context.current) {
			console.log("painting", canvasData.xCor, canvasData.yCor);
			const rect = canvas.current.getBoundingClientRect();
			let x_cor = canvasData.xCor - rect.left;
			let y_cor = canvasData.yCor - rect.top;
			const ctx = context.current;
			ctx.lineWidth = canvasData.penSize;
			ctx.lineCap = "round";
			ctx.strokeStyle = canvasData.penColor;
			ctx.lineTo(x_cor, y_cor);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(x_cor, y_cor);
		}
		if (canvasData.isFinished && context.current) {
			console.log("begining new path ");
			context.current.beginPath();
			setIsFinished(false);
		}
	}, [canvasData, clearCanvas, height, width, setIsFinished]);

	const startPosition = (
		e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
	) => {
		if (gameData.round) if (!gameData.round.isDrawer) return;
		setCoordinate(e.clientX, e.clientY);
		setIsPainting(true);
		setIsFinished(false);
	};

	const finishPosition = () => {
		if (gameData.round) if (!gameData.round.isDrawer) return;
		setIsPainting(false);
		setIsFinished(true);
	};

	const draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		if (gameData.round)
			if (!gameData.round.isDrawer || !canvasData.isPainting) return;
		setCoordinate(e.clientX, e.clientY);
	};

	const changeSize = (e: React.WheelEvent<HTMLCanvasElement>) => {
		if (gameData.round) if (!gameData.round.isDrawer) return;
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
			onMouseDown={(e) => {
				if (!gameData.isStarted) return;
				startPosition(e);
			}}
			onMouseUp={(e) => {
				if (!gameData.isStarted) return;
				finishPosition();
			}}
			onMouseMove={(e) => {
				if (!gameData.isStarted) return;
				draw(e);
			}}
			ref={canvas}
			onWheel={(e) => {
				if (!gameData.isStarted) return;
				changeSize(e);
			}}
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
	setIsFinished,
	setCoordinate,
})(Canvas);
