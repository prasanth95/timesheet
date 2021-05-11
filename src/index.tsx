import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";

import App from "./containers/App/App";
import stores from "./stores";
import "./index.css";
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
	<React.StrictMode>
		<Provider {...stores}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();