import React, { useRef } from "react";
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
	const nameInput = useRef<HTMLInputElement>(null);

	const submitName = (e: React.FormEvent) => {
		e.preventDefault();
		if (nameInput.current) {
			setName(nameInput.current.value);
		}
	};

	return (
		<div className="login">
			<Form onSubmit={(e) => submitName(e)}>
				<FormGroup>
					<FormLabel className="name-label">Name</FormLabel>
					<FormControl
						size="lg"
						type="text"
						ref={nameInput}
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
