import React, { useRef, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import Canvas from "./Canvas";
import storeType from "types/storeType";
import "./Game.scss";
import GamePropType from "./GamePropType";
import { setRoom } from "action";
import socketHandler from "utils/socketHandler";
import history from "utils/history";
import Chatbox from "./Chatbox";
import Playerlist from "./Playerlist";
import Controls from "./Controls";
import Title from "./Title";
import ColourSwatch from "./ColourSwatch";
import Timer from "./Timer";
import ScoreBoard from "./ScoreBoard";

const Game: React.FC<GamePropType> = ({ name, room, gameData, setRoom }) => {
	const canvasBox = useRef<HTMLDivElement>(null);
	const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

	// const params = useParams<any>();

	useEffect(() => {
		// Run On Mount
		if (canvasBox.current) {
			const width = canvasBox.current.clientWidth;
			const height = canvasBox.current.clientHeight;
			setCanvasSize({ width, height });
		}

		if (name && room) {
			socketHandler.connect();
			socketHandler.joinGame(name, room);
		} else history.push("/");
	}, [name, room]);

	useEffect(
		() => () => {
			// disconnecting on component unmount
			socketHandler.disconnect();
		},
		[]
	);

	// useEffect(() => {
	// 	if (!room) {
	// 		setRoom(params.id as string);
	// 	}
	// }, [room, params, setRoom]);

	const setColorSwatchOpacity = () => {
		if (gameData.isStarted && gameData.round) {
			if (gameData.round.isDrawer) return { opacity: 1 };
		}
		return { opacity: 0 };
	};

	return (
		<Container fluid className="game-wrapper">
			<div className="row1-container">
				<div className="row1">
					<div className="title white-box">
						<Title />
					</div>
					<div className="timer white-box">
						<Timer
							minutes={gameData.timer.minutes}
							seconds={gameData.timer.seconds}
						/>
					</div>
					<div className="controls white-box">
						<Controls />
					</div>
				</div>
			</div>
			<div className="row2-container">
				<div className="row2">
					<div className="players white-box">
						<Playerlist />
					</div>
					<div className="canvas-area">
						<div ref={canvasBox} className="canvas-box white-box">
							<Canvas width={canvasSize.width} height={canvasSize.height} />
						</div>
						<div className="tools white-box" style={setColorSwatchOpacity()}>
							<ColourSwatch />
						</div>
					</div>
					<div className="chat white-box">
						<Chatbox />
					</div>
				</div>
			</div>
			<ScoreBoard />
		</Container>
	);
};

const mapStateToProps = (state: storeType) => {
	return {
		room: state.room,
		name: state.name,
		gameData: state.game,
	};
};

export default connect(mapStateToProps, { setRoom })(Game);
