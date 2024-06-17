import React, { useState, useContext } from "react";
import "./ChangePassword.css";
import "../../App.css";
import { TopNav } from "../../components";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import * as Yup from "yup";
import { ErrorMessage, Formik } from "formik";
import { makePostAPICall } from "../../helpers/ApiHelpers";
import Swal from "sweetalert2";
import { AppContext } from "../../context/AppContext";

const ChangePassword = () => {
	const { user } = useContext(AppContext);

	const [visible, setVisible] = useState(false);
	const [visible1, setVisible1] = useState(false);
	const [visible2, setVisible2] = useState(false);

	const validationSchema = Yup.object({
		old_password: Yup.string().required("Your old password is required"),
		new_password: Yup.string().required("Your new password is required"),
		confirm_password: Yup.string()
			.required("Confirm password is required")
			.oneOf([Yup.ref("new_password")], "Passwords must match"),
	});

	const initialValues = {
		action: "change_my_password",
		id: user.id,
		old_password: "",
		new_password: "",
		confirm_password: "",
	};

	return (
		<div>
			<TopNav />
			<div className="my-container">
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={(values) => {
						makePostAPICall(
							"students.php",
							values,
							(response) => {
								Swal.fire({
									position: "top-end",
									title: response.msg,
									showConfirmButton: false,
									timer: 1500,
								});
							},
							(response) => {
								Swal.fire({
									position: "top-end",
									title: response.msg,
									showConfirmButton: false,
									timer: 1500,
								});
							}
						);
					}}
				>
					{({ values, handleSubmit, handleChange }) => (
						<form className="form-area" onSubmit={handleSubmit}>
							<h1 className="header">Change Password</h1>
							<div className="mb-3 form-group col-12">
								<p className="form-label">Old Password</p>
								<div className="has-pwd-icon">
									<input
										className="login-input"
										type={visible ? "text" : "password"}
										name="old_password"
										placeholder="Old Password"
										value={values.old_password}
										onChange={handleChange}
									/>
									{visible ? (
										<BsEye className="view-pwd" size={20} onClick={() => setVisible((prevState) => !prevState)} />
									) : (
										<BsEyeSlash className="view-pwd" size={20} onClick={() => setVisible((prevState) => !prevState)} />
									)}
								</div>
								<ErrorMessage name="old_password" component="div" className="text-danger" />
							</div>
							<div className="mb-3 form-group col-12">
								<p className="form-label">New Password</p>
								<div className="has-pwd-icon">
									<input
										className="login-input"
										type={visible1 ? "text" : "password"}
										name="new_password"
										placeholder="New Password"
										value={values.new_password}
										onChange={handleChange}
									/>
									{visible1 ? (
										<BsEye className="view-pwd" size={20} onClick={() => setVisible1((prevState) => !prevState)} />
									) : (
										<BsEyeSlash className="view-pwd" size={20} onClick={() => setVisible1((prevState) => !prevState)} />
									)}
								</div>
								<ErrorMessage name="new_password" component="div" className="text-danger" />
							</div>
							<div className="mb-3 form-group col-12">
								<p className="form-label">Confirm Password</p>
								<div className="has-pwd-icon">
									<input
										className="login-input"
										type={visible2 ? "text" : "password"}
										name="confirm_password"
										placeholder="Confirm Password"
										value={values.confirm_password}
										onChange={handleChange}
									/>
									{visible2 ? (
										<BsEye className="view-pwd" size={20} onClick={() => setVisible2((prevState) => !prevState)} />
									) : (
										<BsEyeSlash className="view-pwd" size={20} onClick={() => setVisible2((prevState) => !prevState)} />
									)}
								</div>
								<ErrorMessage name="confirm_password" component="div" className="text-danger" />
							</div>
							<div className="form-group col-12 d-flex">
								<button type="submit" className="submit-btn">
									Submit
								</button>
							</div>
						</form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default ChangePassword;
