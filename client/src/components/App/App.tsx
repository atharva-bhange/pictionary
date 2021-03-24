import React from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import "./App.scss";
import Login from "components/Login";
import Game from "components/Game";
import GamePanel from "components/GamePanel";
import history from "utils/history";
import storeType from "types/storeType";
import AppPropType from "./AppPropType";

const App: React.FC<AppPropType> = ({ name }) => {
	return (
		<div className="app">
			<Router history={history}>
				<Route path="/" exact>
					{!name ? <Login /> : <GamePanel />}
				</Route>
				<Route path="/:id" exact>
					<Game />
				</Route>
			</Router>
		</div>
	);
};

const mapStateToProps = (state: storeType) => {
	return {
		name: state.name,
	};
};

export default connect(mapStateToProps)(App);
