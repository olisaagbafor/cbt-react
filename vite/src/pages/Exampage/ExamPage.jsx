import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import { Loader, Profile, SmallTimer, Timer } from "../../components";
import QuestionsList from "../../components/QuestionsList";
import { AppContext } from "../../context/AppContext";
import "./exampage.css";

function ExamPage() {
	let navigate = useNavigate();
	let params = useParams();
	const { exam } = useContext(AppContext);

	const [loading, setLoading] = useState(false);

	const { ref, inView } = useInView();

	useEffect(() => {
		if (exam?.examStatus === "ended") {
			navigate(`/exam/${params.id}/end`);
			return;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) return <Loader />;

	return (
		<div>
			<div className="my-container mt-4">
				<div className="topic">{exam?.title}</div>
				<div className="row">
					<div className="col-lg-8">
						<Profile smaller />
					</div>
					<div className="col-lg-4">
						<Timer aref={ref} setLoading={setLoading} />
					</div>
				</div>
				<SmallTimer inView={inView} />
				<QuestionsList setLoading={setLoading} />
			</div>
		</div>
	);
}

export default ExamPage;
