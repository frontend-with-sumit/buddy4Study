import React from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

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
							<div className="mb-3">
								<label htmlFor="name" className="form-label form__label">
									Name
								</label>
								<input
									id="name"
									type="text"
									name="name"
									placeholder="Enter name"
									className="form-control form__input"
									autoComplete="off"
									value={formik.values.name}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
								/>
								{formik.touched.name && formik.errors.name ? (
									<div className="error-text">{formik.errors.name}</div>
								) : null}
							</div>
							<div className="mb-3">
								<label htmlFor="email" className="form-label form__label">
									Email
								</label>
								<input
									id="email"
									type="email"
									name="email"
									placeholder="Enter Email"
									className="form-control form__input"
									autoComplete="off"
									value={formik.values.email}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
								/>
								{formik.touched.email && formik.errors.email ? (
									<div className="error-text">{formik.errors.email}</div>
								) : null}
							</div>
							<div className="mb-3">
								<label htmlFor="password" className="form-label form__label">
									Password
								</label>
								<input
									id="password"
									type="password"
									name="password"
									placeholder="Enter password"
									className="form-control form__input"
									autoComplete="off"
									value={formik.values.password}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
								/>
								{formik.touched.password && formik.errors.password ? (
									<div className="error-text">{formik.errors.password}</div>
								) : null}
							</div>
							<div className="mb-3">
								<label
									htmlFor="confirm_password"
									className="form-label form__label"
								>
									Confirm Password
								</label>
								<input
									id="confirm_password"
									type="password"
									name="confirm_password"
									placeholder="Enter Confirm Password"
									className="form-control form__input"
									autoComplete="off"
									value={formik.values.confirm_password}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
								/>
								{formik.touched.confirm_password &&
								formik.errors.confirm_password ? (
									<div className="error-text">
										{formik.errors.confirm_password}
									</div>
								) : null}
							</div>
							<div className="mb-3">
								<label htmlFor="mobile" className="form-label form__label">
									Mobile Number
								</label>
								<input
									id="mobile"
									type="text"
									name="mobile"
									maxLength={10}
									placeholder="Enter Mobile Number"
									autoComplete="off"
									className="form-control form__input"
									value={formik.values.mobile}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
								/>
								{formik.touched.mobile && formik.errors.mobile ? (
									<div className="error-text">{formik.errors.mobile}</div>
								) : null}
							</div>
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
