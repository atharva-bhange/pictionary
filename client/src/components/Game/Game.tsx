import React, { useRef, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Canvas from "components/Canvas";

import "./Game.scss";

const Game: React.FC = () => {
	const canvasBox = useRef<HTMLDivElement>(null);
	const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

	useEffect(() => {
		if (canvasBox.current) {
			const width = canvasBox.current.clientWidth;
			const height = canvasBox.current.clientHeight;
			setCanvasSize({ width, height });
		}
	}, []);
	return (
		<Container fluid>
			<Row className="wrapper">
				<Col className="cols" ref={canvasBox} xs={9}>
					<Canvas width={canvasSize.width} height={canvasSize.height} />
				</Col>
				<Col className="chat-box cols"></Col>
			</Row>
		</Container>
	);
};

export default Game;
