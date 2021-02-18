import React from "react";
import { Alert } from "react-bootstrap";

import "./Notification.scss";

const Notification: React.FC = () => {
	const variant = "danger";
	return (
		<Alert variant={variant}>This is a {variant} alert—check it out!</Alert>
	);
};

export default Notification;
