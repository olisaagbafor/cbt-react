import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../pages/Exampage/exampage.css";
import { AppContext } from "../context/AppContext";
import { decryptData, encryptData, getFromStorage, insertNewLine, sanitizeHtmlOption, setToStorage } from "../assets";
import { makePostAPICall } from "../helpers/ApiHelpers";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { MathJax } from "better-react-mathjax";
import sanitizeHtml from "sanitize-html";

const QuestionsList = ({ setLoading }) => {
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

	const [currentQuestion, setCurrentQuestion] = useState(decryptData(getFromStorage("currentQuestion")) || 1);
	const [inputPaginate, setInputPaginate] = useState(decryptData(getFromStorage("currentQuestion")) || 1);
	const [answers, setAnswers] = useState(decryptData(getFromStorage("answers")) || {});

	const numQuestions = exam?.questions.length;
	const examQuestions = exam?.questions;

	useEffect(() => {
		setToStorage("currentQuestion", encryptData(currentQuestion));
	}, [currentQuestion]);

	useEffect(() => {
		setToStorage("answers", encryptData(answers));
	}, [answers]);

	const handleNextButton = () => {
		if (currentQuestion === numQuestions) {
			if (exam?.exam_review === "1") {
				navigate(`/exam/${params.id}/review`);
				return;
			}
			markExam(answers, examQuestions);
			return;
		}
		setCurrentQuestion((prevState) => prevState + 1);
		setInputPaginate((prevState) => prevState + 1);
	};

	const handlePreviousButton = () => {
		if (currentQuestion === 1) return;

		setCurrentQuestion((prevState) => prevState - 1);
		setInputPaginate((prevState) => prevState - 1);
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			if (inputPaginate < 1 || inputPaginate > numQuestions) {
				return;
			}
			setCurrentQuestion(parseInt(event.target.value));
		}
	};

	const handleRadioChange = (event) => {
		const { name, value } = event.target;

		var tempValue = answers;

		tempValue[name] = value;

		setAnswers((prevState) => ({ ...prevState, [name]: value }));
	};

	return (
		<div>
			{exam?.questions.map((question, questionIndex) => {
				let divClass = parseInt(currentQuestion) === parseInt(questionIndex + 1) ? "active-question" : "inactive-question";
				return (
					<div className={`exam-qa-container ${divClass}`} key={`question-${question.id}`}>
						<div className="exam-qa-number">Question {questionIndex + 1} </div>
						<MathJax>
							<div
								className="exam-qa-text"
								dangerouslySetInnerHTML={{
									__html: sanitizeHtml(insertNewLine(question.question_title), sanitizeHtmlOption),
								}}
							/>
						</MathJax>
						<div className="exam-qa-option-container">
							<div className="row">
								{question.optionsArray.map((optionKey) => {
									let option = question.options[optionKey];
									return (
										<div className="col-12" key={`option-${optionKey}`}>
											<MathJax>
												<div className="radio-item">
													<input
														type="radio"
														id={`option-${questionIndex}-${optionKey}`}
														name={question.id}
														value={`option${optionKey}`}
														onChange={(event) => handleRadioChange(event)}
														checked={answers[question.id] === `option${optionKey}`}
													/>
													<label
														htmlFor={`option-${questionIndex}-${optionKey}`}
														dangerouslySetInnerHTML={{
															__html: sanitizeHtml(insertNewLine(option), sanitizeHtmlOption),
														}}
													/>
												</div>
											</MathJax>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				);
			})}
			<div className="scroll-pagination">
				{exam?.questions.map((question, questionIndex) => {
					let additionalClassName = "";
					if (answers.hasOwnProperty(question.id)) {
						additionalClassName += "answered ";
					}
					if (currentQuestion === questionIndex + 1) {
						additionalClassName += "current";
					}
					return (
						<div
							className={`scroll-item ${additionalClassName}`}
							key={question.id}
							onClick={() => {
								setCurrentQuestion(questionIndex + 1);
								setInputPaginate(questionIndex + 1);
							}}
						>
							{questionIndex + 1}
						</div>
					);
				})}
			</div>
			<div className="qa-btn-container">
				<div className="row" style={{ rowGap: 15 }}>
					<div className="col-md-8">
						<div className="exam-paginate">
							<button
								className={currentQuestion === 1 ? "paginate-prev" : "paginate-prev paginate-active"}
								disabled={currentQuestion === 1}
								onClick={() => handlePreviousButton()}
							>
								<AiFillCaretLeft size={16} />
							</button>
							<input
								type="number"
								name="paginate-input"
								className="paginate-input"
								value={inputPaginate}
								onChange={(e) => setInputPaginate(parseInt(e.target.value))}
								onKeyDown={(e) => handleKeyDown(e)}
								min={1}
								max={numQuestions}
							/>
							<p className="paginate-text" id="pagenate-num">
								of {numQuestions}
							</p>
							<button
								className={currentQuestion === numQuestions ? "paginate-next" : "paginate-next paginate-active"}
								disabled={currentQuestion === numQuestions}
								onClick={() => handleNextButton()}
							>
								<AiFillCaretRight size={16} />
							</button>
						</div>
					</div>
					<div className="col-md-4">
						<div className="d-flex align-items-center justify-content-end">
							<button className="previous" onClick={handlePreviousButton} disabled={currentQuestion === 1}>
								Previous
							</button>

							<button className="next" onClick={handleNextButton}>
								{currentQuestion === numQuestions ? "Submit" : "Next"}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuestionsList;
