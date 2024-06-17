import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { capitalizeFirstLetter, decryptData, encryptData, getFromStorage, setToStorage } from "../assets";
import { AppContext } from "../context/AppContext";
import { makePostAPICall } from "../helpers/ApiHelpers";

import "../pages/Exampage/exampage.css";
import "./components.css";

const ReviewList = ({ setLoading }) => {
	const { exam, user, setExam } = useContext(AppContext);

	let navigate = useNavigate();
	let params = useParams();

	const answers = decryptData(getFromStorage("answers"));
	const examQuestions = exam?.questions;

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

	const navigateToQuestion = (questionNumber) => {
		setToStorage("currentQuestion", encryptData(questionNumber));
		navigate(`/exam/${params.id}/start`);
	};

	return (
		<div>
			<div
				className="exam-qa-container"
				style={{
					paddingLeft: "0",
					paddingRight: "0",
					backgroundColor: "transparent",
				}}
			>
				<p className="review-instruction">Please ensure to go over all your answers before submission!</p>
				<div className="row">
					{examQuestions.map((question, index) => {
						return (
							<div className="col-lg-6 mb-3" key={question.id} onClick={() => navigateToQuestion(index + 1)}>
								<div className={`review-cell ${answers[question.id] ? "answered" : ""} p-3`}>
									<p className="">Question {index + 1}</p>
									<p>
										{answers[question.id]
											? `${capitalizeFirstLetter(answers[question.id]).substr(0, 6)} ${capitalizeFirstLetter(
													answers[question.id]
											  ).substr(6, 1)}`
											: ""}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="col-12">
				<div className="d-flex justify-content-end align-items-center">
					<button className="previous" onClick={() => navigate(`/exam/${params.id}/start`)}>
						Previous
					</button>

					<button className="next" onClick={() => markExam(answers, examQuestions)}>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default ReviewList;
