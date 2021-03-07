import React, { useRef, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import Canvas from "components/Canvas";
import storeType from "types/storeType";
import "./Game.scss";
import GamePropType from "./GamePropType";
import { setRoom } from "action";
import { Client } from "socket";
import history from "utils/history";
import Chatbox from "./Chatbox";
import Playerlist from "./Playerlist";
import Controls from "./Controls";
import Title from "./Title";
import ColourSwatch from "./ColourSwatch";

const Game: React.FC<GamePropType> = ({ name, room, setRoom }) => {
	const canvasBox = useRef<HTMLDivElement>(null);
	const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
	const client = useRef<Client | null>(null);

	// const params = useParams<any>();

	useEffect(() => {
		// Run On Mount
		if (canvasBox.current) {
			const width = canvasBox.current.clientWidth;
			const height = canvasBox.current.clientHeight;
			setCanvasSize({ width, height });
		}

		if (name && room) {
			client.current = new Client();
			client.current.joinGame(name, room);
		} else history.push("/");
	}, [name, room]);

	useEffect(
		() => () => {
			// disconnecting on component unmount
			if (client.current) client.current.socket.disconnect();
		},
		[]
	);

	// useEffect(() => {
	// 	if (!room) {
	// 		setRoom(params.id as string);
	// 	}
	// }, [room, params, setRoom]);

	return (
		<Container fluid className="game-wrapper">
			<div className="row1-container">
				<Row className="row1">
					<Col className="title white-box">
						<Title />
					</Col>
					<Col className="controls white-box">
						<Controls />
					</Col>
				</Row>
			</div>
			<div className="row2-container">
				<div className="row2">
					<div className="players white-box">
						<Playerlist />
					</div>
					<div className="canvas-area">
						<div className="canvas-box white-box"></div>
						<div className="tools white-box">
							<ColourSwatch />
						</div>
					</div>
					<div className="chat white-box">
						<Chatbox />
					</div>
				</div>
			</div>
		</Container>
	);
};

const mapStateToProps = (state: storeType) => {
	return {
		room: state.room,
		name: state.name,
	};
};

export default connect(mapStateToProps, { setRoom })(Game);
