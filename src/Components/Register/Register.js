import React from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Input from "../Reusable/Input";

function Register() {
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
			confirm_password: "",
			mobile: "",
		},
		validate: (values) => {
			const errors = {};
			if (!values.name) errors.name = "Name is required";

			if (!values.email) errors.email = "Email is required";
			else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
				errors.email = "Invalid email address";

			if (!values.password) errors.password = "Password is required";

			if (!values.confirm_password)
				errors.confirm_password = "Confirm password is required";

			if (!values.mobile) errors.mobile = "Mobile number is required";
			else if (values.mobile.length !== 10)
				errors.mobile = "Mobile number should be of 10 characters";

			return errors;
		},
		onSubmit: ({ name, email, password, confirm_password, mobile }) => {
			if (password !== confirm_password)
				return toast.error("Password didn't match");

			const userDetails = {
				name,
				email,
				password,
				mobile,
			};

			localStorage.setItem("user", JSON.stringify(userDetails));
			toast.success("Registration successfull");
			setTimeout(() => {
				navigate("/");
			}, 1000);
		},
	});

	return (
		<div className="container-fluid">
			<div className="row h-100">
				<div className="col-sm-12 h-100 p-2 d-flex justify-content-center align-items-center">
					<div className="login shadow-sm">
						<h2 className="heading">Register</h2>
						<form onSubmit={formik.handleSubmit} className="form">
							<Input
								label="Name"
								name="name"
								placeholder="Enter Name"
								formik={formik}
							/>
							<Input
								label="Email"
								type="email"
								name="email"
								placeholder="Enter Email"
								formik={formik}
							/>
							<Input
								label="Password"
								type="password"
								name="password"
								placeholder="Enter Password"
								formik={formik}
							/>
							<Input
								label="Confirm Password"
								type="password"
								name="confirm_password"
								placeholder="Enter Confirm Password"
								formik={formik}
							/>
							<Input
								label="Mobile Number"
								name="mobile"
								placeholder="Enter Mobile"
								formik={formik}
								maxLength={10}
							/>
							<button type="submit" className="btn btn-primary w-100 mt-2">
								Register
							</button>
						</form>
						<p className="mt-2">
							Already have an account?{" "}
							<span>
								<Link to="/">Login</Link>
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;
