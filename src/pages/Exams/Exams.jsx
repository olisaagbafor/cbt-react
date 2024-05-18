import React, { useContext, useEffect, useState } from "react";
import "./exams.css";

import { Link, NavLink } from "react-router-dom";
import { TopNav, Profile, Loader } from "../../components";
import { makeGetAPICall } from "../../helpers/ApiHelpers";
import { capitalizeFirstLetter } from "../../assets";
import Swal from "sweetalert2";
import { AppContext } from "../../context/AppContext";
import DataTable from "react-data-table-component";

function Exams() {
	const { school } = useContext(AppContext);

	const [exams, setExams] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		makeGetAPICall(
			"exams.php",
			{ action: "list_student_exams" },
			(response) => {
				setExams(response.data || []);
				setLoading(false);
			},
			() => {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Couldn't get your exams. Please inform a teacher, refresh and try again",
				});
			}
		);
	}, []);

	const columns = [
		{
			name: "Name",
			selector: (row) => row.title,
			grow: 3,
		},
		{
			name: "Type",
			selector: (row) => capitalizeFirstLetter(row?.exam_type_label),
			width: "120px",
			compact: true,
		},
		{
			name: "Date",
			selector: (row) => row?.exam_date.slice(0, -9),
			width: "150px",
			compact: true,
		},
		{
			name: "Time",
			selector: (row) => row?.exam_date.slice(-9, -3),
			width: "110px",
			compact: true,
		},
		{
			name: "Duration",
			selector: (row) => `${row?.duration} minutes`,
			width: "150px",
			compact: true,
		},
		{
			name: "",
			cell: (row) => (
				<div className="d-flex gap-2" style={{ width: "100%" }}>
					<NavLink to={`/exam/${row?.id}`} className="exam-btn" style={{ width: "max-content" }}>
						{row?.enrolment.status === "awaiting" ? "Start" : "Continue"} Exam
					</NavLink>
					{!!parseInt(school?.is_tertiary_institution) && !!parseInt(row?.number_of_attempts) && (
						<Link to={`/history/${row?.id}`} className="exam-btn" style={{ width: "max-content" }}>
							Previous Submissions
						</Link>
					)}
				</div>
			),
			grow: 3,
		},
	];

	if (loading) return <Loader />;

	return (
		<div>
			<TopNav />
			<div className="my-container">
				<div className="exams-container">
					<Profile />
					<div className="exam-tb-container">
						<div className="row">
							<div className="table-responsive">
								<DataTable
									columns={columns}
									data={exams?.filter((exam) => exam?.enrolment.status !== "completed")}
									customStyles={{
										table: {
											style: {
												backgroundColor: "transparent",
											},
										},
										headRow: {
											style: {
												background: "var(--secondary)",
												fontStyle: "normal",
												fontWeight: "bold",
												fontSize: "1.6rem",
												lineHeight: "20px",
												width: "100%",
												color: "var(--primary)",
												padding: "15px 15px",
												marginBottom: "20px",
											},
										},
										header: {
											style: { verticalAlign: "middle", height: "50px", marginBottom: "20px" },
										},
										cells: {
											style: {
												backgroundColor: "var(--white)",
												fontStyle: "normal",
												fontWeight: 500,
												fontSize: "1.6rem",
												lineHeight: "20px",
												color: "var(--darker-gray)",
												padding: "10px 20px",
											},
										},
										rows: {
											style: {
												marginBottom: 10,
											},
										},
									}}
									noDataComponent={
										<div className="d-flex justify-content-center align-items-center bg-white p-4" style={{ fontSize: 16 }}>
											You have not been enrolled for any exams
										</div>
									}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Exams;
