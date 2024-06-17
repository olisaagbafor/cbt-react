/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { makeGetAPICall, makePostAPICall } from "../../helpers/ApiHelpers";
import Swal from "sweetalert2";
import { Loader, SingleImageDropzone } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { ErrorMessage, Formik, useFormikContext } from "formik";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const AdditionalField = ({ field }) => {
	const { setFieldValue, values } = useFormikContext();

	switch (field?.field_type) {
		case "text":
			return (
				<div className="px-2 col-md-6">
					<div className="form-group">
						<label>{field?.field_name}</label>
						<input
							type="text"
							name={field?.field_name}
							className="form-control"
							value={values?.additional_fields?.hasOwnProperty(field?.field_name) ? values.additional_fields[field?.field_name] : ""}
							onChange={(event) => {
								const temp = { ...values.additional_fields };
								temp[field?.field_name] = event.target.value;
								setFieldValue("additional_fields", temp);
							}}
						/>
					</div>
				</div>
			);
		case "select": {
			const field_options = field?.field_options.split(",");
			return (
				<div className="px-2 col-md-6">
					<div className="form-group">
						<label>{field?.field_name}</label>
						<div className="exctr-select-input">
							<select
								className="form-control"
								name={field?.field_name}
								value={
									values?.additional_fields?.hasOwnProperty(field?.field_name) ? values.additional_fields[field?.field_name] : ""
								}
								onChange={(event) => {
									const temp = { ...values.additional_fields };
									temp[field?.field_name] = event.target.value;
									setFieldValue("additional_fields", temp);
								}}
							>
								<option value="">Select {field?.field_name}</option>
								{field_options?.map((option, index) => (
									<option value={option} key={index}>
										{option}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
			);
		}
		default:
			return;
	}
};

const Register = () => {
	const { school_code } = useParams();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [visible, setVisible] = useState(false);
	const [details, setDetails] = useState(null);
	const [levels, setLevels] = useState(null);
	const [classes, setClasses] = useState(null);
	const [current_session, setCurrent_session] = useState(null);

	useEffect(() => {
		makeGetAPICall(
			"student_signup.php",
			{ action: "get_info_for_self_signup", school_code: school_code },
			({ data }) => {
				if (!parseInt(data?.school?.allow_self_registration)) {
					return Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "Your school doesn't allow self registration",
						allowEscapeKey: false,
						allowOutsideClick: false,
					}).then((result) => {
						if (result.isDismissed) {
							navigate("/");
						}
					});
				}
				setDetails(data?.school);
				setLevels(data?.levels);
				setClasses(
					data?.classes?.sort(function (a, b) {
						return a.class.localeCompare(b.class);
					})
				);
				setCurrent_session(data?.current_session);
				setLoading(false);
			},
			({ msg }) => {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: msg,
					allowEscapeKey: false,
					allowOutsideClick: false,
				}).then((result) => {
					if (result.isConfirmed) {
						setLoading(false);
						navigate("/");
					}
				});
			}
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const additional_fields = JSON.parse(details?.additional_fields ?? null);
	console.log(additional_fields);

	const validationSchema = Yup.object().shape({
		firstname: Yup.string().required("First Name is required"),
		lastname: Yup.string().required("Last Name is required"),
		class_id: Yup.string().required("Please select a class"),
		email: Yup.string().required("Email is required"),
		gender: Yup.string().required("Please select a gender"),
		address: Yup.string(),
		phone: Yup.string(),
		image: Yup.mixed(),
		password: Yup.string().required("Password is required"),
	});

	const initialValues = {
		action: "add_student",
		firstname: "",
		lastname: "",
		class_id: "",
		admission_number: "",
		email: "",
		password: "",
		gender: "",
		address: "",
		phone: "",
		image: null,
		school_code,
		additional_fields: null,
	};

	if (loading) return <Loader />;

	return (
		<div style={{ fontSize: "14px" }}>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					values["user_name"] = values.firstname.concat(values.lastname);
					values["term_id"] = current_session;

					const selectedClass = classes?.find((singleClass) => singleClass.id === values.class_id);

					values["level_id"] = levels?.find((level) => level.level_name === selectedClass.level).id;

					makePostAPICall(
						"students.php",
						values,
						() => {
							Swal.fire({
								icon: "success",
								toast: true,
								position: "top-end",
								title: "Student Created Successfully",
								showConfirmButton: false,
								timer: 1500,
							}).then(() => {
								navigate(`/login/${school_code}`);
							});
						},
						({ msg }) => {
							Swal.fire({
								icon: "error",
								title: "Oops...",
								text: msg,
							});
							setSubmitting(false);
						}
					);
				}}
			>
				{({ values, handleSubmit, handleChange, setFieldValue, isSubmitting }) => (
					<div className="my-container">
						<form className="form-area register-form" onSubmit={handleSubmit}>
							<h1 className="header" style={{ alignSelf: "center", marginBottom: 30 }}>
								{details?.name} Registration
							</h1>
							<div className="display-image">
								<SingleImageDropzone setFieldValue={setFieldValue} image={values.image} fieldName="image" />
								<ErrorMessage name="image" component="div" className="text-danger" />
							</div>
							<div className="row" style={{ rowGap: 10 }}>
								<div className="px-2 col-md-6">
									<div className="form-group">
										<label>Class</label>
										<div className="exctr-select-input">
											<select className="form-control" name="class_id" onChange={handleChange} value={values.class_id}>
												<option value="">Select Class</option>
												{classes?.map((singleClass) => (
													<option value={singleClass.id} label={singleClass.class} key={singleClass.id} />
												))}
											</select>
											<ErrorMessage name="class_id" component="div" className="text-danger" />
										</div>
									</div>
								</div>
								<div className="px-2 col-md-6">
									<div className="form-group">
										<label>Admission number</label>
										<input
											type="text"
											name="admission_number"
											className="form-control"
											value={values.admission_number}
											onChange={handleChange}
										/>
										<ErrorMessage name="admission_number" component="div" className="text-danger" />
									</div>
								</div>
								<div className="px-2 col-md-6">
									<div className="form-group">
										<label>First Name</label>
										<input
											type="text"
											name="firstname"
											className="form-control"
											value={values.firstname}
											onChange={handleChange}
										/>
										<ErrorMessage name="firstname" component="div" className="text-danger" />
									</div>
								</div>
								<div className="px-2 col-md-6">
									<div className="form-group">
										<label>Last Name</label>
										<input type="text" name="lastname" className="form-control" value={values.lastname} onChange={handleChange} />
										<ErrorMessage name="lastname" component="div" className="text-danger" />
									</div>
								</div>
								<div className="px-2 col-md-6">
									<div className="form-group">
										<label>Email</label>
										<input type="email" name="email" className="form-control" value={values.email} onChange={handleChange} />
										<ErrorMessage name="email" component="div" className="text-danger" />
									</div>
								</div>
								<div className="px-2 col-md-6">
									<div className="form-group">
										<label>Password</label>
										<div className="has-pwd-icon">
											<input
												className="login-input"
												style={{
													height: "38px",
													color: "#495057",
													border: "1px solid #ced4da",
												}}
												type={visible ? "text" : "password"}
												name="password"
												value={values.password}
												onChange={handleChange}
											/>
											{visible ? (
												<BsEye className="view-pwd" size={20} onClick={() => setVisible((prevState) => !prevState)} />
											) : (
												<BsEyeSlash className="view-pwd" size={20} onClick={() => setVisible((prevState) => !prevState)} />
											)}
										</div>
										<ErrorMessage name="password" component="div" className="text-danger" />
									</div>
								</div>
								<div className="px-2 col-md-6">
									<div className="form-group">
										<label>Gender</label>
										<div className="exctr-select-input">
											<select className="form-control" name="gender" onChange={handleChange} value={values.gender}>
												<option value="">Select Gender</option>
												<option value="Male">Male</option>
												<option value="Female">Female</option>
											</select>
											<ErrorMessage name="gender" component="div" className="text-danger" />
										</div>
									</div>
								</div>
								<div className="px-2 col-md-6">
									<div className="form-group">
										<label>Address</label>
										<div className="">
											<input
												type="text"
												name="address"
												className="form-control"
												value={values.address || ""}
												onChange={handleChange}
											/>
											<ErrorMessage name="address" component="div" className="text-danger" />
										</div>
									</div>
								</div>
								<div className="px-2 col-md-6">
									<div className="form-group">
										<label>Phone</label>
										<div className="">
											<input
												type="text"
												name="phone"
												className="form-control"
												value={values.phone || ""}
												onChange={handleChange}
											/>
											<ErrorMessage name="phone" component="div" className="text-danger" />
										</div>
									</div>
								</div>
							</div>
							<div className="col-12" style={{ rowGap: 10 }}>
								{additional_fields?.at(0) !== "" && (
									<>
										<h2 className="signup-settings-header ml-3">Additional fields</h2>
										<div className="row" style={{ rowGap: 10 }}>
											{additional_fields?.map((field, index) => (
												<AdditionalField field={field} key={index} />
											))}
										</div>
									</>
								)}
							</div>
							<div className="flex-wrap p-0 col-12 d-flex justify-content-end" style={{ rowGap: 10 }}>
								<div className="form-group exam_result_filter_btn">
									<button type="submit" id="schd-btn1" className="mt-4 btn btn-block pri-action-btn" disabled={isSubmitting}>
										Submit
									</button>
								</div>
							</div>
						</form>
					</div>
				)}
			</Formik>
		</div>
	);
};

export default Register;
