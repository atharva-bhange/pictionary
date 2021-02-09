import React from "react";
import { Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.scss";
import Login from "components/Login";
import Game from "components/Game";
import history from "utils/history";
import store from "utils/storeConfig";

const App: React.FC = () => {
	return (
		<div className="app">
			<Provider store={store}>
				<Router history={history}>
					<Route path="/" exact>
						<Login />
					</Route>
					<Route path="/:id" exact>
						<Game />
					</Route>
				</Router>
			</Provider>
		</div>
	);
};

export default App;
