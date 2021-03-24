import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import reduxThunk from "redux-thunk";

import reducers from "reducers";

const store = createStore(
	reducers,
	composeWithDevTools(applyMiddleware(reduxThunk))
);

export default store;
