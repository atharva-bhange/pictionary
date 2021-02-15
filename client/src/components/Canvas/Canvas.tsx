import React, { useRef, useEffect, useState } from "react";

import CanvasPropType from "./CanvasPropType";
import "./Canvas.scss";
import colors from "utils/colorPanel";

const Canvas: React.FC<CanvasPropType> = ({ height, width }) => {
	const canvas = useRef<HTMLCanvasElement | null>(null);
	const context = useRef<CanvasRenderingContext2D | null>(null);
	const isPainting = useRef(false);
	const [penColor, setPenColor] = useState("#000000");
	const [penSize, setPenSize] = useState(8);

	useEffect(() => {
		if (canvas.current) {
			context.current = canvas.current.getContext("2d");
		}
	}, []);

	const startPosition = (
		e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
	) => {
		isPainting.current = true;
		draw(e);
	};

	const finishPosition = () => {
		isPainting.current = false;
		context.current?.beginPath();
	};

	const draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		if (isPainting.current && context.current) {
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
		if (e.deltaY < 0) {
			// wheel moving up
			const newPenSize = penSize === 20 ? 20 : penSize + 1;
			setPenSize(newPenSize);
		} else if (e.deltaY > 0) {
			// wheel moving down
			const newPenSize = penSize === 1 ? 1 : penSize - 1;
			setPenSize(newPenSize);
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
							onClick={() => setPenColor(colorVal)}
						></div>
					))}
				</div>
			</div>
		</>
	);
};

export default Canvas;
