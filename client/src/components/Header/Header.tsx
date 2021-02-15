import React from "react";
import { connect } from "react-redux";

import "./Header.scss";
import storeType from "types/storeType";
import HeaderPropType from "./HeaderPropType";
import { setName } from "action";

const Header: React.FC<HeaderPropType> = ({ name, setName }) => {
	const renderContent = () => {
		if (name) {
			return (
				<h3>
					{name} <i className="fas fa-edit" onClick={() => setName(null)}></i>
				</h3>
			);
		}
	};

	return <div className="header">{renderContent()}</div>;
};

const mapStateTopProps = (state: storeType) => {
	return {
		name: state.name,
	};
};

export default connect(mapStateTopProps, { setName })(Header);
