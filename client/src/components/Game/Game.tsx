import React, { useRef, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import Canvas from "components/Canvas";
import storeType from "types/storeType";
import "./Game.scss";
import GamePropType from "./GamePropType";
import { setRoom } from "action";
import { Client } from "socket";
import history from "utils/history";

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
		<Container fluid>
			<Row className="wrapper">
				<Col className="cols" ref={canvasBox} xs={9}>
					<Canvas
						client={client.current}
						width={canvasSize.width}
						height={canvasSize.height}
					/>
				</Col>
				<Col className="chat-box cols"></Col>
			</Row>
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
