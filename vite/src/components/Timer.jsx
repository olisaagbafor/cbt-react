import React, { useContext } from "react";
import "./components.css";

import Countdown, { zeroPad } from "react-countdown";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { decryptData, encryptData, getFromStorage, setToStorage } from "../assets";
import { makePostAPICall } from "../helpers/ApiHelpers";

const Timer = ({ setLoading, aref }) => {
	const { exam, user, setExam } = useContext(AppContext);
	let navigate = useNavigate();
	let params = useParams();

	const markExam = (answers, examQuestions) => {
		setLoading(true);
		let questions = [];
		for (const property in answers) {
			questions.push({
				id: property,
				answer: answers[property].substr(6, 1),
			});
		}

		let duration = decryptData(getFromStorage("timeLeft"));

		makePostAPICall(
			"exams.php",
			{
				action: "submit_exam",
				user_id: user.id,
				exam_id: exam?.id,
				marks: exam?.marks_per_answer,
				duration,
				questions,
			},
			(response) => {
				setToStorage("result", JSON.stringify(response.data));
				navigate(`/exam/${params.id}/end`);
				setExam((prevState) => {
					const { questions, ...others } = prevState;
					return { ...others, examStatus: "ended" };
				});
			},
			() => markExam(answers, examQuestions)
		);
	};

	const timeLeft = decryptData(getFromStorage("timeLeft"));

	return (
		<div className="timer-container" ref={aref}>
			<div className="timer-title">Time remaining</div>
			<div className="timer-text">
				<Countdown
					date={Date.now() + (timeLeft || parseFloat(exam?.duration) * 60 * 1000)}
					renderer={({ hours, minutes, seconds }) => (
						<span>
							{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
						</span>
					)}
					onTick={({
						total,
						// hours, seconds, minutes
					}) => {
						// if (hours === 0 && minutes === 30 && seconds === 0) {
						// 	alert("You have 30 minutes left");
						// }
						// if (hours === 0 && minutes === 10 && seconds === 0) {
						// 	alert("You have 10 minutes left");
						// }
						// if (hours === 0 && minutes === 5 && seconds === 0) {
						// 	alert("You have 5 minutes left");
						// }
						// if (hours === 0 && minutes === 1 && seconds === 0) {
						// 	alert("You have 1 minute left");
						// }
						setToStorage("timeLeft", encryptData(total));
					}}
					onComplete={() => {
						const answers = decryptData(getFromStorage("answers"));
						const examQuestions = exam?.questions;

						markExam(answers, examQuestions);
					}}
				/>
			</div>
		</div>
	);
};

export default Timer;
