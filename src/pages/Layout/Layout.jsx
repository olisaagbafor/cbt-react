import React, { useContext, useEffect, useState } from "react";
import "./layout.css";
import { Outlet, useLocation, useParams, useNavigate } from "react-router-dom";

import { AppContext } from "../../context/AppContext";

import Topnav from "../../components/TopNav";
import { Loader, Profile, TabVisibility } from "../../components";
import { encryptData, decryptData, getFromStorage, setToStorage } from "../../assets";
import { makeGetAPICall, makePostAPICall } from "../../helpers/ApiHelpers";
import Swal from "sweetalert2";

const Layout = () => {
	let navigate = useNavigate();
	let params = useParams();
	let location = useLocation();

	const { setExam, exam, user } = useContext(AppContext);
	const [loading, setLoading] = useState(true);
	const count = TabVisibility();

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
				setLoading(false);
			},
			() => markExam(answers, examQuestions)
		);
	};

	function shuffleArray(array) {
		return array.sort(() => Math.random() - 0.5);
	}

	useEffect(() => {
		//? if there isnt an exam get the exam by id
		if (!exam) {
			makeGetAPICall(
				"exams.php",
				{ action: "list_exam_by_id", exam_id: params.id },
				(response) => {
					setExam(response.data[0]);
				},
				() => {
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "Couldn't get this exam. Please inform a teacher, refresh and try again",
					});
				}
			);
		}

		//? if there is an exam and the id of the exam isnt the id in the url redirect to that page
		//? done to prevent students from jumping from one exam to the other
		if (exam && exam?.id !== params.id) {
			return navigate(`/exam/${params.id}`);
		}

		//? to get here, it means you have an exam in storage
		//? check if there is an exam and exam hasnt ended and if exam questions have been fetched
		//? if no, fetch exam questions
		//? if there arent any questions means they havent started the exam so make api call to start the exam
		if (!!exam && exam?.examStatus !== "ended" && !exam?.questions) {
			makeGetAPICall(
				"questions.php",
				{ action: "get_exam_questions", exam_id: params.id },
				(response) => {
					let questions = response.data;

					//? shuffle options if required
					if (exam?.shuffle_options === "1") {
						questions = questions.map((question) => {
							let optionsArray = shuffleArray(Object.keys(question.options));
							return { optionsArray, ...question };
						});
					} else {
						questions = questions.map((question) => {
							let optionsArray = Object.keys(question.options);
							return { optionsArray, ...question };
						});
					}

					setExam((prevState) => {
						return { ...prevState, questions };
					});
					setLoading(false);
				},
				() => {
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "Couldn't get questions for this exam. Please inform a teacher, refresh and try again",
					});
				}
			);
			makePostAPICall(
				"exams.php",
				{
					action: "start_exam",
					user_id: user.id,
					exam_id: exam?.id,
				},
				() => {},
				() => {
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "Couldn't start your exam. Please inform a teacher, refresh and try again",
					});
					return;
				}
			);
		} else {
			setLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [exam]);

	useEffect(() => {
		setToStorage("exam", encryptData(exam));
	}, [exam]);

	useEffect(() => {
		if (parseInt(exam?.switch_tab_limit) > 0) {
			if (count === 0) return;
			if (count === parseInt(exam?.switch_tab_limit)) {
				Swal.fire({
					icon: "warning",
					title: "Warning",
					text: "You have switched tabs too many times",
				});
				const answers = decryptData(getFromStorage("answers"));
				const examQuestions = exam?.questions;

				markExam(answers, examQuestions);
			} else {
				Swal.fire({
					icon: "warning",
					title: "Warning",
					text: "You have switched tab",
				});
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [count]);

	if (loading) return <Loader />;

	if (location.pathname.endsWith("start") || location.pathname.endsWith("review"))
		return (
			<div>
				<Topnav />
				<Outlet />
			</div>
		);

	return (
		<div>
			<Topnav />
			<div className="my-container">
				<div className="layouts-container">
					<Profile />
					<div className="layout-tb-container">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Layout;
