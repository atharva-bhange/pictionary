import React, { useEffect, useState } from "react";
import { Form, Col, Row, Button, FormControl } from "react-bootstrap";
import { connect } from "react-redux";

import history from "utils/history";
import storeType from "types/storeType";
import GamePanelPropType from "./GamePanelPropType";
import { getRandomRoom, createRoom, setRoom } from "action";
import socketHandler from "utils/socketHandler";
import "./Game.scss";

const GamePanel: React.FC<GamePanelPropType> = ({
	room,
	getRandomRoom,
	createRoom,
	setRoom,
	name,
}) => {
	useEffect(() => {
		if (name && !socketHandler.isConnected()) {
			socketHandler.connect();
			socketHandler.newPlayer(name);
		}
		if (room) {
			history.push(`/${room}`);
		}
	}, [room, name]);

	const [customRoom, setCustomRoom] = useState<string>("");
	const [joinRoom, setJoinRoom] = useState<string>("");

	const onCreateSubmit = () => {
		if (customRoom.length > 0) {
			createRoom(customRoom);
		}
	};

	const onJoinClick = () => {
		setRoom(joinRoom);
		if (joinRoom.length > 0) {
			history.push(`/${joinRoom}`);
		}
	};

	return (
		<div className="game-panel">
			<Form>
				<Row>
					<Col>
						<p>Create Private Room</p>

						<FormControl
							size="lg"
							type="text"
							placeholder="Custom Game Id"
							value={customRoom}
							onChange={(e) => {
								let val = e.target.value;
								val = val.replace(" ", "-");
								setCustomRoom(val);
							}}
						></FormControl>
						<Button
							type="button"
							variant="success"
							className="mt-3"
							size="lg"
							onClick={onCreateSubmit}
						>
							Create
						</Button>
					</Col>
					<Col>
						<p>Quick Join</p>
						<Button size="lg" onClick={() => getRandomRoom()}>
							Join Random Game
						</Button>
					</Col>
					<Col>
						<p>Join A Room</p>
						<FormControl
							size="lg"
							type="text"
							placeholder="Game Id"
							value={joinRoom}
							onChange={(e) => {
								let val = e.target.value;
								setJoinRoom(val);
							}}
						></FormControl>
						<Button
							variant="secondary"
							className="mt-3"
							size="lg"
							onClick={onJoinClick}
						>
							Join
						</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

const mapStateToProps = (state: storeType) => {
	return {
		room: state.room,
		name: state.name,
	};
};

export default connect(mapStateToProps, { getRandomRoom, createRoom, setRoom })(
	GamePanel
);
