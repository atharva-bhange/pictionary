import React from "react";
import { Button } from "react-bootstrap";

import "./Chatbox.scss";
import Message from "./Message";

const Chatbox: React.FC = () => {
	return (
		<div className="chatbox">
			<div className="chat-display">
				<div className="overflow-chat">
					<Message sender="Athhb" message="test msg" />
					<Message sender="Athhb" message="test msg" success />
					<Message sender="Athhb" message="test msg" />
					<Message sender="Athhb" message="test msg" />
					<Message sender="Athhb" message="test msg" />
					<Message sender="Athhb" message="test msg" />
					<Message sender="Athhb" message="test msg" />
					<Message sender="Athhb" message="test msg" />
					<Message sender="Athhb" message="test msg" />
					<Message sender="Athhb" message="test msg" />
					<Message sender="Athhb" message="test msg" />

					<Message sender="Athhb" message="test msg" />
					<Message sender="Athhb" message="test msg" />
					<Message sender="Athhb" message="test msg" />
					<Message sender="Athhb" message="test msg" />
				</div>
			</div>
			<form className="guess-input">
				<input type="text" size={1}></input>
				<Button variant="light">
					<i className="fas fa-location-arrow"></i>
				</Button>
			</form>
		</div>
	);
};

export default Chatbox;
