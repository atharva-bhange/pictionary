import React from "react";
import { Form, Col, Row, Button, FormControl } from "react-bootstrap";
import history from "utils/history";

import "./Game.scss";

const GamePanel: React.FC = () => {
	return (
		<div className="game-panel">
			<Form>
				<Row>
					<Col>
						<p>Create Private Room</p>
						<FormControl
							size="lg"
							type="text"
							placeholder="Custom Game Id"
						></FormControl>
						<Button variant="success" className="mt-3" size="lg">
							Create
						</Button>
					</Col>
					<Col>
						<p>Quick Join</p>
						<Button size="lg" onClick={() => history.push("/abc")}>
							Join Random Game
						</Button>
					</Col>
					<Col>
						<p>Join A Room</p>
						<FormControl
							size="lg"
							type="text"
							placeholder="Game Id"
						></FormControl>
						<Button variant="secondary" className="mt-3" size="lg">
							Join
						</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

export default GamePanel;
