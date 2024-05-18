import React, { useContext } from "react";
import { calcTimeDelta } from "react-countdown";
import { Link, useParams } from "react-router-dom";

import { AppContext } from "../../context/AppContext";
import "./instruction.css";

function Instruction() {
	const { exam } = useContext(AppContext);

	let params = useParams();

	const returnDuration = () => {
		const { hours, minutes, seconds } = calcTimeDelta(Date.now() + parseFloat(exam?.duration) * 60 * 1000);
		let time = "";
		if (hours) time += `${hours} hours`;
		if (minutes) time += `${minutes} minutes`;
		if (seconds) time += `${seconds} seconds`;

		return time;
	};

	const durationType = {
		exam: "Time is for entire exam",
		per_question: "Time is per question",
	};

	return (
		<>
			<div className="instructions-container">
				<div className="header-text">EXAM DETAILS </div>
				<div className="mt-3">
					<div className="row">
						<div className="d-flex mb-3">
							<div className="col-lg-2">
								<p className="header-content-text">Exam Title:</p>
							</div>
							<div className="col-lg-10">
								<p className="header-text-sub">{exam?.title}</p>
							</div>
						</div>
						<div className="d-flex mb-3">
							<div className="col-lg-2">
								<p className="header-content-text">Exam Date:</p>
							</div>
							<div className="col-lg-10">
								<p className="header-text-sub">{exam?.exam_date.slice(0, -9)}</p>
							</div>
						</div>
						<div className="d-flex mb-3">
							<div className="col-lg-2">
								<p className="header-content-text">Duration:</p>
							</div>
							<div className="col-lg-10">
								<p className="header-text-sub">
									{returnDuration()} <span className="bold-text">({durationType[exam?.duration_type]})</span>
								</p>
							</div>
						</div>
						<div className="d-flex mb-3">
							<div className="col-lg-2">
								<p className="header-content-text">Number of questions:</p>
							</div>
							<div className="col-lg-10">
								<p className="header-text-sub">{exam?.total_question}</p>
							</div>
						</div>
						<div className="d-flex mb-3">
							<div className="col-lg-2">
								<p className="header-content-text">Marks per question:</p>
							</div>
							<div className="col-lg-10">
								<p className="header-text-sub">{parseFloat(exam?.marks_per_answer)}</p>
							</div>
						</div>
						<div className="row">
							<div className="col-lg-2">
								<p className="header-content-text">Instruction:</p>
							</div>
							<div
								className="col-lg-10 instruction"
								dangerouslySetInnerHTML={{
									__html: exam?.start_instructions,
								}}
							/>
						</div>
						{parseInt(exam?.switch_tab_limit) > 0 ? (
							<div className="row">
								<div className="col-lg-2">
									<p className="header-content-text text-danger">
										<strong>Note:</strong>
									</p>
								</div>
								<div className="col-lg-10 instruction text-danger" style={{ marginLeft: "15px" }}>
									<strong>
										Please note you are not allowed to switch tabs during the cause of this test/exam. You can be penalised if
										caught
									</strong>
								</div>
							</div>
						) : (
							""
						)}
					</div>
				</div>
			</div>
			<Link to={`/exam/${params.id}/start`}>
				<button className="start">Start Exam</button>
			</Link>
		</>
	);
}

export default Instruction;
