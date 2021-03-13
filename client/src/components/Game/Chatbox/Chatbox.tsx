import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

import "./Chatbox.scss";
import Message from "./Message";
import ChatboxPropType from "./ChatboxPropType";
import storeType from "types/storeType";
import socketHandler from "utils/socketHandler";

const Chatbox: React.FC<ChatboxPropType> = ({ chats, name }) => {
	const [msg, setMsg] = useState("");
	const scrollBox = useRef<HTMLDivElement>(null);

	const renderChats = () => {
		return chats.map((chat, index) => (
			<Message
				key={index}
				sender={chat.sender}
				message={chat.message}
				success={chat.isGuessed}
			/>
		));
	};

	useEffect(() => {
		if (!scrollBox.current) return;
		scrollBox.current.scrollTop = scrollBox.current.scrollHeight;
	}, [chats]);

	const onSendClicked = (e: React.FormEvent) => {
		e.preventDefault();
		if (name && msg.length > 0) socketHandler.sendMessage(name, msg.trim());
		setMsg("");
	};

	return (
		<div className="chatbox">
			<div className="chat-display">
				<div className="overflow-chat" ref={scrollBox}>
					{renderChats()}
				</div>
			</div>
			<form className="guess-input" onSubmit={onSendClicked}>
				<input
					type="text"
					size={1}
					value={msg}
					onChange={(e) => setMsg(e.target.value)}
				></input>
				<Button type="submit" variant="light">
					<i className="fas fa-location-arrow"></i>
				</Button>
			</form>
		</div>
	);
};

const mapStateToProps = (store: storeType) => {
	return {
		chats: store.game.chats,
		name: store.name,
	};
};

export default connect(mapStateToProps)(Chatbox);
