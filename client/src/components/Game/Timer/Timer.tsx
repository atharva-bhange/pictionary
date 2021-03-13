import React from "react";

import "./Timer.scss";
import TimerPropType from "./TimerPropType";

const Timer: React.FC<TimerPropType> = ({ minutes, seconds }) => {
	const minutesString = minutes < 10 ? `0${minutes}` : minutes.toString();
	const secondsString = seconds < 10 ? `0${seconds}` : seconds.toString();
	return (
		<div className="timer-box">
			<div className="time">{`${minutesString} : ${secondsString}`}</div>
		</div>
	);
};

export default Timer;
