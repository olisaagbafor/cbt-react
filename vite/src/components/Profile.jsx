import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import "./components.css";

function Profile({ smaller }) {
	const { user } = useContext(AppContext);

	return (
		<div className="pr-container">
			<img
				className="pr-img hide-mid"
				src={user.image ? user.image : "https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png"}
				alt="profile.png"
			/>
			<div className="pr-details-container">
				<div className="pr-detail-title">STUDENT’S DETAILS</div>
				<div className="row">
					<div className="col-md-6">
						<p className="pr-header-text" style={{ fontSize: smaller ? "16px" : "" }}>
							Name:
							<span className="pr-header-sub" style={{ fontSize: smaller ? "16px" : "" }}>
								{user.firstname} {user.lastname}
							</span>
						</p>
					</div>
					<div className="col-md-6">
						<p className="pr-header-text" style={{ fontSize: smaller ? "16px" : "" }}>
							Gender:
							<span className=" pr-header-sub" style={{ fontSize: smaller ? "16px" : "" }}>
								{user.gender}
							</span>
						</p>
					</div>
					{!!user.admission_number && (
						<div className="col-lg-6">
							<p className="pr-header-text" style={{ fontSize: smaller ? "16px" : "" }}>
								Admission number:
								<span className=" pr-header-sub" style={{ fontSize: smaller ? "16px" : "" }}>
									{user.admission_number}
								</span>
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Profile;
