import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { encryptData, getFromStorage, setToStorage } from "../assets";
import logo from "../assets/images/logo2.png";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { AppContext } from "../context/AppContext";
import { makeGetAPICall, makePostAPICall } from "../helpers/ApiHelpers";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";

function LoginNoCode() {
	const { setToken, setUser, setSchool, token, user } = useContext(AppContext);
	const navigate = useNavigate();

	const localSchoolCode = getFromStorage("school_code");

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [schoolCode, setSchoolCode] = useState(localSchoolCode ?? "");
	const [schools, setSchools] = useState(null);
	const [visible1, setVisible1] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		makeGetAPICall(
			"schools.php",
			{ action: "list_schools" },
			(response) => {
				setSchools(response.data);
			},
			(error) => {
				Swal.fire({
					icon: "error",
					toast: true,
					position: "top-end",
					title: error.msg,
					showConfirmButton: false,
					timer: 1500,
				});
			}
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		setLoading(true);
		makePostAPICall(
			"students.php",
			{ action: "signin", email, password, school_code: schoolCode },
			(response) => {
				// setState
				setToken(response.data.token);
				setUser(response.data.student);
				setSchool(response.data.school);

				setToStorage("studentToken", response.data.token);
				setToStorage("studentUser", encryptData(response.data.student));
				setToStorage("school", encryptData(response.data.school));
				setToStorage("school_code", schoolCode);

				navigate("/home");
			},
			(response) => {
				Swal.fire({
					position: "top-end",
					title: response.msg,
					showConfirmButton: false,
					timer: 1500,
				}).then(() => setLoading(false));
			}
		);
	};

	const switchSchool = () => {
		localStorage.removeItem("school_code");
		window.location.reload();
	};

	if (token && user) {
		return <Navigate to="/home" replace />;
	}

	return (
		<div>
			<LogoContainer className="container">
				<div className="d-flex justify-content-center justify-content-sm-start">
					<Logo src={logo} alt="Examcentre Logo" />
				</div>
			</LogoContainer>
			<div className="row"></div>
			<div className="col-lg-12 col-xl-12 col-md-12 mx-auto px-5">
				<div className="d-flex justify-content-center flex-column align-items-center">
					<Header>Sign into Your Account</Header>

					<FormContainer onSubmit={(e) => handleSubmit(e)}>
						{!localSchoolCode && (
							<FormGroup>
								<FormText>School</FormText>
								<div className="form-group exctr-select-input large">
									<select
										value={schoolCode}
										onChange={(event) => {
											setSchoolCode(event.target.value);
										}}
										required
										name="schoolCode"
										className="form-control login-input"
									>
										<option value="" disabled>
											Select a school
										</option>
										{schools?.map((school, key) => (
											<option key={key} value={school.school_code}>
												{school.name}
											</option>
										))}
									</select>
								</div>
							</FormGroup>
						)}

						<FormGroup>
							<FormText>Email</FormText>
							<input
								className="login-input"
								type="email"
								name="email"
								placeholder="Email Address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</FormGroup>
						<FormGroup>
							<FormText>Password</FormText>
							<div className="has-pwd-icon">
								<input
									type={visible1 ? "text" : "password"}
									name="password"
									placeholder="Password"
									className="login-input"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
								{visible1 ? (
									<BsEye className="view-pwd" size={20} onClick={() => setVisible1((prevState) => !prevState)} />
								) : (
									<BsEyeSlash className="view-pwd" size={20} onClick={() => setVisible1((prevState) => !prevState)} />
								)}
							</div>
						</FormGroup>
						<Button type="submit">{loading ? <span className="btn-loader"></span> : "Login"}</Button>
						{!!localSchoolCode && (
							<SwitchButton type="button" onClick={switchSchool}>
								Switch School
							</SwitchButton>
						)}
					</FormContainer>
				</div>
			</div>
		</div>
	);
}
const LogoContainer = styled.div`
	padding: 50px;
`;

const Logo = styled.img`
	width: 150px;
	object-fit: contain;
`;
const Header = styled.h1`
	font-family: Inter;
	font-style: normal;
	font-weight: bold;
	font-size: 3.6rem;
	line-height: 43px;
	text-align: center;
	color: ${(props) => props.theme.primary};
`;
const FormContainer = styled.form`
	width: 100%;
	max-width: 450px;
	margin: 50px 0 20px;
`;
const FormGroup = styled.div`
	margin-bottom: 20px;
	width: 100%;
	max-width: 450px;
`;
const Text = styled.p`
	font-family: Inter;
	font-style: normal;
	font-weight: 400;
	font-size: 1.6rem;
	line-height: 24px;
	text-align: center;
	margin-bottom: 50px;
	color: ${(props) => props.theme.grey};
`;

const FormText = styled(Text)`
	text-align: left;
	margin-bottom: 5px;
	font-size: 16px;
	font-weight: 500;
	color: grey;
`;

const SwitchButton = styled.button`
	margin-top: 10px;
	margin-left: auto;
	font-weight: 500;
	font-size: 14px;
	color: ${(props) => props.theme.primary};
`;

const Button = styled.button`
	width: 100%;
	height: 48px;
	border-radius: 10px;
	background-color: ${(props) => props.theme.primary};
	color: #ffffff;
	border: none;
	font-family: Inter;
	font-style: normal;
	font-weight: bold;
	font-size: 1.6rem;
	line-height: 19px;
	margin-top: 30px;
`;

export default LoginNoCode;
