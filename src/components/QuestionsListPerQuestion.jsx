import React from "react";
import "../pages/Exampage/exampage.css";
import { insertNewLine, sanitizeHtmlOption } from "../assets";
import { MathJax } from "better-react-mathjax";
import sanitizeHtml from "sanitize-html";
import Profile from "./Profile";
import { useInView } from "react-intersection-observer";
import TimerPerQuestion from "./TimerPerQuestion";
import SmallTimerPerQuestion from "./SmallTimerPerQuestion";

const QuestionsListPerQuestion = ({ currentQuestion, setCurrentQuestion, answers, setAnswers, setLoading, question, questionIndex }) => {
	const { ref, inView } = useInView();

	const handleRadioChange = (event) => {
		const { name, value } = event.target;

		var tempValue = answers;

		tempValue[name] = value;

		setAnswers((prevState) => ({ ...prevState, [name]: value }));
	};

	let divClass = parseInt(currentQuestion) === parseInt(questionIndex + 1) ? "active-question" : "inactive-question";

	return (
		<>
			<div className="row">
				<div className="col-lg-8">
					<Profile smaller />
				</div>
				<div className="col-lg-4">
					<TimerPerQuestion aref={ref} setLoading={setLoading} setCurrentQuestion={setCurrentQuestion} currentQuestion={currentQuestion} />
				</div>
			</div>
			<SmallTimerPerQuestion inView={inView} />
			<div>
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
			</div>
		</>
	);
};

export default QuestionsListPerQuestion;
