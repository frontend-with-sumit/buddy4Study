import React from "react";

function Input({ label, type = "text", name, placeholder, ...props }) {
	return (
		<div className="mb-3">
			<label htmlFor={name} className="form-label form__label">
				{label}
			</label>
			<input
				id={name}
				type={type}
				name={name}
				className="form-control form__input"
				placeholder={placeholder}
				value={props?.formik?.values[name]}
				onBlur={props?.formik?.handleBlur}
				onChange={props?.formik?.handleChange}
				{...props}
			/>
			{props?.formik?.touched[name] && props?.formik?.errors[name] ? (
				<div className="error-text">{props?.formik?.errors[name]}</div>
			) : null}
		</div>
	);
}

export default Input;
