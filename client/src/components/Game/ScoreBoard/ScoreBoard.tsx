import React from "react";
import { Modal, ModalBody, ModalTitle } from "react-bootstrap";
import { connect, ConnectedProps } from "react-redux";
import storeType from "types/storeType";

import "./ScoreBoard.scss";

const mapStateToProps = (state: storeType) => {
	return {
		isDisplayed: state.game.scores.isDisplayed,
		scores: state.game.scores.data,
	};
};
const connector = connect(mapStateToProps);

const ScoreBoard: React.FC<ConnectedProps<typeof connector>> = ({
	isDisplayed,
	scores,
}) => {
	const positions = ["first", "second", "third"];

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

	return (
		<Modal
			show={isDisplayed}
			size="lg"
			centered
			backdrop="static"
			keyboard={false}
			dialogClassName="score-modal"
		>
			<ModalTitle className="score-title">Scores</ModalTitle>
			<ModalBody className="score-body">{renderScores()}</ModalBody>
		</Modal>
	);
};

export default connect(mapStateToProps)(ScoreBoard);
