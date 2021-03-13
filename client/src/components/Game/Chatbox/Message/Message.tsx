import React from "react";

import "./Message.scss";
import MessagePropType from "./MessagePropType";

const Message: React.FC<MessagePropType> = ({
	success = false,
	message,
	sender,
}) => {
	if (success) {
		return <div className="success-box">{sender} : guessed correctly!</div>;
	} else {
		return (
			<div className="message-box">
				<span className="sender">{sender} : </span>
				<span className="message">{message}</span>
			</div>
		);
	}
};

export default Message;
