import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";

import "./Login.scss";
import Input from "../Reusable/Input";

function Login() {
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			email_mobile: "",
			password: "",
		},
		validate: (values) => {
			const errors = {};
			if (!values.email_mobile) {
				errors.email_mobile = "Email/Mobile Number is required";
			}

			if (!values.password) {
				errors.password = "Password is required";
			}

			return errors;
		},
		onSubmit: (values) => {
			const isValid = validateLogin(values);
			if (isValid) {
				toast.success("Login successfull");
				setTimeout(() => {
					navigate("/products");
				}, 1000);
			} else toast.error("Invalid credentials");
		},
	});

	// Here, we are validating the user input with the values stored in the localStorage
	const validateLogin = (values) => {
		const user = JSON.parse(localStorage.getItem("user"));
		return (
			user &&
			(values.email_mobile === user.mobile ||
				values.email_mobile === user.email) &&
			values.password === user.password
		);
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-sm-12 p-2 d-flex justify-content-center align-items-center">
					<div className="login shadow-sm">
						<h2 className="heading">Login</h2>
						<form onSubmit={formik.handleSubmit} className="form">
							<Input
								label="Email/Mobile Number"
								name="email_mobile"
								placeholder="Enter Email/Mobile"
								formik={formik}
							/>
							<Input
								label="Password"
								type="password"
								name="password"
								placeholder="Enter Password"
								formik={formik}
							/>

							<button type="submit" className="btn btn-primary w-100 mt-2">
								Login
							</button>
						</form>
						<p className="mt-2">
							Need an account?{" "}
							<span>
								<Link to="/register">Register Here</Link>
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
