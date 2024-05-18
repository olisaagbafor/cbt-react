import React, { useContext } from "react";
import "./components.css";

import Countdown, { zeroPad } from "react-countdown";
import { AppContext } from "../context/AppContext";
import { decryptData, getFromStorage } from "../assets";

const SmallTimer = ({ inView }) => {
	const { exam } = useContext(AppContext);

	const timeLeft = decryptData(getFromStorage("timeLeft"));

	if (inView) return null;

	return (
		<div className="small-timer-container">
			<div className="small-timer-text">
				<Countdown
					date={Date.now() + (timeLeft || parseFloat(exam?.duration) * 60 * 1000)}
					renderer={({ hours, minutes, seconds }) => (
						<span>
							{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
						</span>
					)}
				/>
			</div>
		</div>
	);
};

export default SmallTimer;
