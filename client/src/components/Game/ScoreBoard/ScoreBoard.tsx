import { leaveGame } from "action";
import React, { useRef, useState, useEffect } from "react";
import {
	Modal,
	ModalBody,
	ModalTitle,
	ModalFooter,
	Button,
} from "react-bootstrap";
import { connect, ConnectedProps } from "react-redux";
import storeType from "types/storeType";

import "./ScoreBoard.scss";

const mapStateToProps = (state: storeType) => {
	return {
		isDisplayed: state.game.scores.isDisplayed,
		isFinished: state.game.isFinished,
		scores: state.game.scores.data,
	};
};

const mapDispatchToProps = {
	leaveGame: leaveGame,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const ScoreBoard: React.FC<Props> = ({
	isDisplayed,
	scores,
	isFinished,
	leaveGame,
}) => {
	const positions = ["first", "second", "third"];
	const [time, setTime] = useState(5);
	const intervalId = useRef<NodeJS.Timeout | null>(null);

	const renderScores = () => {
		const renderComponents = [];
		let sortable: [number, string][] = [];
		for (const person in scores) {
			sortable.push([scores[person], person]);
		}
		sortable.sort((a, b) => b[0] - a[0]);
		let oldVal: number | null = null;
		let positionsGiven = 0;
		for (let i = 0; i < sortable.length; i++) {
			if (positionsGiven <= 2 && sortable[i][0] > 0) {
				if (oldVal === sortable[i][positionsGiven]) {
					renderComponents.push(
						<div
							key={sortable[i][1]}
							className={`candidate ${positions[positionsGiven - 1]}`}
						>
							<span>{sortable[i][1]}</span>
							<span>{sortable[i][0]}</span>
						</div>
					);
				} else {
					renderComponents.push(
						<div
							key={sortable[i][1]}
							className={`candidate ${positions[positionsGiven]}`}
						>
							<span>{sortable[i][1]}</span>
							<span>{sortable[i][0]}</span>
						</div>
					);
					positionsGiven += 1;
					oldVal = sortable[i][0];
				}
			} else {
				renderComponents.push(
					<div key={sortable[i][1]} className={`candidate`}>
						<span>{sortable[i][1]}</span>
						<span>{sortable[i][0]}</span>
					</div>
				);
			}
		}

		return renderComponents;
	};

	const startTime = () => {
		if (!isFinished) return;
		intervalId.current = setInterval(() => {
			setTime((oldTime) => oldTime - 1);
		}, 1000);
	};

	useEffect(startTime, [isFinished]);
	useEffect(() => {
		if (time === 0 && intervalId.current) {
			clearInterval(intervalId.current);
			leaveGame();
		}
	}, [leaveGame, time]);

	const renderFooter = () => {
		if (isFinished) {
			return (
				<ModalFooter>
					<p>Leaving match in {time}</p>
					<Button variant="danger" onClick={leaveGame}>
						Leave Now
					</Button>
				</ModalFooter>
			);
		}
	};

	return (
		<Modal
			show={isDisplayed}
			size="lg"
			centered
			backdrop="static"
			keyboard={false}
			dialogClassName="score-modal"
		>
			<ModalTitle className="score-title">
				{isFinished ? "Game Over" : "Scores"}
			</ModalTitle>
			<ModalBody className="score-body">{renderScores()}</ModalBody>
			{renderFooter()}
		</Modal>
	);
};

export default connector(ScoreBoard);
