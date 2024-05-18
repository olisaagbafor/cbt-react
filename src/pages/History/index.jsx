import React, { useContext, useEffect, useState } from "react";
import { Loader, TopNav } from "../../components";
import "./history.css";
import { makeGetAPICall } from "../../helpers/ApiHelpers";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import DataTable from "react-data-table-component";

const History = () => {
	const { user } = useContext(AppContext);
	const { exam_id } = useParams();

	const [response, setResponse] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		makeGetAPICall(
			"students.php",
			{ action: "previous_results", exam_id, user_id: user?.id },
			(response) => {
				setResponse(response.data);
				setLoading(false);
			},
			() => {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Couldn't get result history",
				}).then(() => setLoading(false));
			}
		);
	}, [exam_id, user?.id]);

	const options = { day: "2-digit", month: "long", year: "numeric" };

	const columns = [
		{
			name: "Date",
			selector: (row) => new Intl.DateTimeFormat("en-US", options).format(new Date(row?.created_at)),
			grow: 1.5,
			minWidth: "250px",
		},
		{
			name: "Attempted",
			selector: (row) => `${row?.q_attempted} / ${response?.exam?.total_question}`,
		},
		{
			name: "Correct",
			selector: (row) => `${row?.q_correct} / ${response?.exam?.total_question}`,
		},
		{
			name: "Wrong",
			selector: (row) => `${row?.q_failed} / ${response?.exam?.total_question}`,
		},
		{
			name: "Score",
			selector: (row) => `${row?.score}%`,
		},
	];

	if (loading) return <Loader />;

	return (
		<div>
			<TopNav />
			<div className="my-container">
				<h1 className="header">Exam History</h1>
				<h2 className="subheader">
					Exam name: <span>{response?.exam?.title}</span>
				</h2>
				<DataTable
					columns={columns}
					data={response?.logs}
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
								fontSize: "16px",
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
								fontSize: "16px",
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
	);
};

export default History;
