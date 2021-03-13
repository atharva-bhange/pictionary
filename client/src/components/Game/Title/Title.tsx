import React from "react";
import { connect } from "react-redux";

import "./Title.scss";
import TitlePropType from "./TitlePropType";
import storeType from "types/storeType";

const Title: React.FC<TitlePropType> = ({ gameData }) => {
	const renderBlankWord = (wrd: string) => {
		let stripped = wrd.trim();
		let divs = [];
		for (let i = 0; i < stripped.length; i++) {
			divs.push(<div key={i} className="underline"></div>);
		}
		return divs;
	};

	const renderStatus = () => {
		if (!gameData.isStarted || !gameData.round) return;
		return gameData.round.isDrawer ? "You Are Drawing" : "Guess!";
	};

	const renderRound = () => {
		if (!gameData.isStarted || !gameData.round) return;
		return <div className="cir">{gameData.round.id.toString()}</div>;
	};

	const renderWord = () => {
		if (!gameData.isStarted || !gameData.round) return;
		if (gameData.round.isDrawer) return gameData.round.word;
		else return renderBlankWord(gameData.round.word);
	};

	return (
		<div className="title-box">
			<div className="status">{renderStatus()}</div>
			<div className="round">{renderRound()}</div>
			<div className="word">{renderWord()}</div>
		</div>
	);
};

const mapStateToProps = (state: storeType) => {
	return {
		gameData: state.game,
	};
};

export default connect(mapStateToProps)(Title);
