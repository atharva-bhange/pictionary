import React, { useEffect, useState } from "react";
import { Form, Col, Row, Button, FormControl } from "react-bootstrap";
import { connect } from "react-redux";

import history from "utils/history";
import storeType from "types/storeType";
import GamePanelPropType from "./GamePanelPropType";
import { getRandomRoom, createRoom, setRoom } from "action";
import socketHandler from "utils/socketHandler";
import "./Game.scss";
import Header from "components/Header";

const GamePanel: React.FC<GamePanelPropType> = ({
	room,
	getRandomRoom,
	createRoom,
	setRoom,
	name,
	online,
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

	const [joinRoom, setJoinRoom] = useState<string>("");

	const onJoinClick = () => {
		setRoom(joinRoom);
		if (joinRoom.length > 0) {
			history.push(`/${joinRoom}`);
		}
	};

	const onJoinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let val = e.target.value;
		if (val.length > 0 && val.length < 6) {
			val = val.replace(" ", "");
			setJoinRoom(val);
		} else if (val.length >= 6) {
			val = val.replace(" ", "");
			val = val.substr(0, 5);
			setJoinRoom(val);
		} else {
			setJoinRoom(val);
		}
	};

	return (
		<div className="game-panel">
			<Header />
			<div className="panel-box">
				<Form>
					<p>Quick Join</p>
					<Button autoFocus size="lg" onClick={socketHandler.findRandomGame}>
						Join Random Game
					</Button>
				</Form>
				<Form>
					<p className="mt-4">Create/Join Game</p>
					<FormControl
						size="lg"
						type="text"
						placeholder="Game Id"
						value={joinRoom}
						onChange={onJoinChange}
					></FormControl>
					<Button
						variant="secondary"
						className="mt-3"
						size="lg"
						onClick={onJoinClick}
					>
						Join
					</Button>
				</Form>
			</div>
			<div className="player-count">Online Players : {online}</div>
		</div>
	);
};

const mapStateToProps = (state: storeType) => {
	return {
		room: state.room,
		name: state.name,
		online: state.online,
	};
};

export default connect(mapStateToProps, { getRandomRoom, createRoom, setRoom })(
	GamePanel
);
