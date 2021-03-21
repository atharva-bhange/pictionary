import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import "./Header.scss";
import storeType from "types/storeType";
import HeaderPropType from "./HeaderPropType";
import { setName } from "action";
import socketHandler from "utils/socketHandler";

const Header: React.FC<HeaderPropType> = ({ name, setName }) => {
	const renderContent = () => {
		if (name) {
			return (
				<Button variant="light" size="lg">
					{name}
				</Button>
			);
		}
	};

	return (
		<div className="header">
			{renderContent()}
			<Button
				variant="danger"
				size="lg"
				className="ml-2"
				onClick={() => {
					setName(null);
					socketHandler.disconnect();
				}}
			>
				Logout
			</Button>
		</div>
	);
};

const mapStateTopProps = (state: storeType) => {
	return {
		name: state.name,
	};
};

export default connect(mapStateTopProps, { setName })(Header);
