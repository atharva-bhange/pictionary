import React from "react";

import "./Title.scss";

const Title: React.FC = () => {
	const word = "Apple";

	const renderBlankWord = (wrd: string) => {
		let stripped = wrd.trim();
		let divs = [];
		for (let i = 0; i < stripped.length; i++) {
			divs.push(<div className="underline"></div>);
		}
		return divs;
	};

	return (
		<div className="title-box">
			<div className="status">You Are Drawing</div>
			<div className="round">1</div>
			<div className="word">{renderBlankWord(word)}</div>
		</div>
	);
};

export default Title;
