import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import logo from "../assets/images/logo2.png";
import { AppContext } from "../context/AppContext";
import { makePostAPICall } from "../helpers/ApiHelpers";

function Topnav() {
	const { user } = useContext(AppContext);
	let location = useLocation();

	if (location.pathname.endsWith("start") || location.pathname.endsWith("review"))
		return (
			<div className="my-container mt-4 d-flex justify-content-between align-items-center">
				<Link to="/home" className="">
					<img src={logo} className="logo-image" alt="Examcentre Logo" />
				</Link>
			</div>
		);

	return (
		<div className="my-container mt-4 d-flex justify-content-between align-items-center">
			<Link to="/home" className="">
				<img src={logo} className="logo-image" alt="Examcentre Logo" />
			</Link>
			<div className="d-flex justify-content-end align-items-center">
				<Link to="/home" className="hide-small">
					<Button>Home</Button>
				</Link>

				<ButtonSecondary
					onClick={() => {
						makePostAPICall(
							"students.php",
							{ action: "signout", id: user.id },
							() => {
								localStorage.removeItem("studentToken");
								localStorage.removeItem("studentUser");
								localStorage.removeItem("exam");
								localStorage.removeItem("school");
								localStorage.removeItem("currentQuestion");
								localStorage.removeItem("answers");
								localStorage.removeItem("timeLeft");
								localStorage.removeItem("result");
								window.location.reload();
							},
							() => {
								Swal.fire({
									icon: "error",
									title: "Oops...",
									text: "Couldn't log you out. Please inform a teacher, refresh and try again",
								});
							}
						);
					}}
				>
					Logout
				</ButtonSecondary>

				<Link to="/profile">
					<Profile
						src={user.image ? user.image : "https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png"}
					/>
				</Link>
			</div>
		</div>
	);
}
const Button = styled.button`
	width: 100px;
	height: 48px;
	font-family: Inter;
	font-style: normal;
	font-weight: 600;
	font-size: 1.6rem;
	line-height: 28px;
	border-radius: 8px;
	margin-right: 15px;
	border: none;
	color: ${(props) => props.theme.white};
	background: ${(props) => props.theme.primary};
`;

const ButtonSecondary = styled.button`
	width: 100px;
	height: 48px;
	font-family: Inter;
	font-style: normal;
	font-weight: 600;
	font-size: 1.6rem;
	line-height: 28px;
	margin-right: 15px;
	border-radius: 8px;
	border: none;
	color: ${(props) => props.theme.primary};
	background: ${(props) => props.theme.secondary};
`;

const Profile = styled.img`
	width: 54px;
	height: 54px;
	border-radius: 50%;
`;

export default Topnav;
