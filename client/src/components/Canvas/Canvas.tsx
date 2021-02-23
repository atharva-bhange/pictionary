import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";

import CanvasPropType from "./CanvasPropType";
import "./Canvas.scss";
import colors from "utils/colorPanel";
import storeType from "types/storeType";

const Canvas: React.FC<CanvasPropType> = ({
	height,
	width,
	canvasData,
	gameData,
	name,
	client,
}) => {
	const canvas = useRef<HTMLCanvasElement | null>(null);
	const context = useRef<CanvasRenderingContext2D | null>(null);
	const isPainting = useRef(false);
	const [penColor, setPenColor] = useState("#000000");
	const [penSize, setPenSize] = useState(8);
	const canDraw = useRef<boolean>(false);

	useEffect(() => {
		if (canvas.current) {
			context.current = canvas.current.getContext("2d");
		}
	}, []);

	useEffect(() => {
		if (gameData && name) {
			if (gameData.round.drawer === name) canDraw.current = true;
			else canDraw.current = false;
		}
		console.log(canDraw.current);
	});

	useEffect(() => {
		if (context.current && !canDraw.current && canvasData) {
			const ctx = context.current;
			ctx.lineWidth = canvasData.penSize || 8;
			ctx.lineCap = "round";
			ctx.lineTo(canvasData.xCor, canvasData.yCor);
			ctx.strokeStyle = canvasData.penColor;
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(canvasData.xCor, canvasData.yCor);
			if (canvasData.isFinished) ctx.beginPath();
		}
	}, [canvasData]);

	const startPosition = (
		e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
	) => {
		isPainting.current = true;
		draw(e);
	};

	const finishPosition = (
		e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
	) => {
		isPainting.current = false;
		context.current?.beginPath();
		client?.sendDrawingData({
			xCor: e.clientX,
			yCor: e.clientY,
			penColor: penColor,
			penSize: penSize,
			isFinished: true,
		});
	};

	const draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		if (isPainting.current && context.current && canDraw.current && client) {
			client.sendDrawingData({
				xCor: e.clientX,
				yCor: e.clientY,
				penColor: penColor,
				penSize: penSize,
				isFinished: false,
			});
			const ctx = context.current;
			ctx.lineWidth = penSize;
			ctx.lineCap = "round";
			ctx.lineTo(e.clientX, e.clientY);
			ctx.strokeStyle = penColor;
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(e.clientX, e.clientY);
		}
	};

	const changeSize = (e: React.WheelEvent<HTMLCanvasElement>) => {
		if (canDraw.current) {
			if (e.deltaY < 0) {
				// wheel moving up
				const newPenSize = penSize === 20 ? 20 : penSize + 1;
				setPenSize(newPenSize);
			} else if (e.deltaY > 0) {
				// wheel moving down
				const newPenSize = penSize === 1 ? 1 : penSize - 1;
				setPenSize(newPenSize);
			}
		}
	};

	return (
		<>
			<canvas
				width={width}
				height={height - 152}
				onMouseDown={startPosition}
				onMouseUp={finishPosition}
				onMouseMove={draw}
				ref={canvas}
				onWheel={changeSize}
			></canvas>
			<div className="tool-box">
				<div className="color-panel">
					{colors.map((colorVal, index) => (
						<div
							key={index}
							className={`boxes ${penColor === colorVal ? "box-focus" : ""}`}
							style={{ backgroundColor: colorVal }}
							onClick={() => {
								if (canDraw.current) setPenColor(colorVal);
							}}
						></div>
					))}
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state: storeType) => {
	return {
		canvasData: state.canvas,
		gameData: state.game,
		name: state.name,
	};
};

export default connect(mapStateToProps)(Canvas);
