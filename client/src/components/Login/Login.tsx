import React, { useEffect, useState } from "react";
import {
	Form,
	FormControl,
	FormGroup,
	FormLabel,
	Button,
} from "react-bootstrap";
import { connect } from "react-redux";

import { setName } from "action";
import "./Login.scss";
import LoginPropType from "./LoginPropType";

const Login: React.FC<LoginPropType> = ({ setName }) => {
	const [nameInput, setNameInput] = useState("");

	useEffect(() => {
		document.title = "skech";
	}, []);

	const submitName = (e: React.FormEvent) => {
		e.preventDefault();
		setName(nameInput);
	};

	const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let val = e.target.value;
		if (val.length >= 12) val = val.substring(0, 12);
		setNameInput(val);
	};

	return (
		<div className="login">
			<Form onSubmit={(e) => submitName(e)}>
				<FormGroup>
					<FormLabel className="name-label">Name</FormLabel>
					<FormControl
						autoFocus
						size="lg"
						type="text"
						onChange={onNameChange}
						value={nameInput}
						placeholder="Enter Name"
					></FormControl>
				</FormGroup>
				<Button type="submit" size="lg">
					Let's Play!
				</Button>
			</Form>
		</div>
	);
};

export default connect(null, { setName })(Login);
