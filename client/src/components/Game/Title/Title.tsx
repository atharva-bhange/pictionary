import React from "react";
import { connect } from "react-redux";

import "./Title.scss";
import TitlePropType from "./TitlePropType";
import storeType from "types/storeType";

const Title: React.FC<TitlePropType> = ({ gameData }) => {
	const word = "Apple";

	const renderBlankWord = (wrd: string) => {
		let stripped = wrd.trim();
		let divs = [];
		for (let i = 0; i < stripped.length; i++) {
			divs.push(<div className="underline"></div>);
		}
		return divs;
	};

	const renderStatus = () => {
		if (!gameData) return;
		return gameData.round.isDrawer ? "You Are Drawing" : "Guess!";
	};

	const renderRound = () => {
		if (!gameData) return;
		return gameData.round.id.toString();
	};

	return (
		<div className="title-box">
			<div className="status">{renderStatus()}</div>
			<div className="round">{renderRound()}</div>
			<div className="word">{renderBlankWord(word)}</div>
		</div>
	);
};

const mapStateToProps = (state: storeType) => {
	return {
		gameData: state.game,
	};
};

export default connect(mapStateToProps)(Title);
