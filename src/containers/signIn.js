import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";

import Footer from "../components/default/Footer";
import Header from "../components/default/Header";
import { clearErrorsAction } from "../reduxs/users/actions";
import { signIn } from "../reduxs/users/operations";
import { getUser } from "../reduxs/users/selectors";

export default function SignIn() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { search } = useLocation();

	const { errors = {} } = useSelector(getUser);

	const initialValues = {
		email: "",
		password: "",
	};

	const [values, setValues] = useState(initialValues);
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setValues((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const onSubmitSignIn = () => {
		setIsLoading(true);

		dispatch(
			signIn(values, () => {
				dispatch(clearErrorsAction());
				setIsLoading(false);
				navigate(`/${search}`);
			})
		);
	};

	return (
		<>
			<Header search={search} />
			<section className="main-wrapper">
				<div className="sign-in">
					<p className="title">SIGN IN</p>
					<div className="form-container">
						<label htmlFor="email">Email Address</label>
						<input
							id="email"
							className="custom-input"
							type="email"
							name="email"
							placeholder="Enter Email"
							value={values.email}
							onChange={handleInputChange}
						/>
						{errors.email ? <span className="error-text">{errors.email[0]}</span> : null}

						<label className="mt-2" htmlFor="password">
							Password
						</label>
						<input
							id="password"
							className="custom-input"
							type="password"
							name="password"
							placeholder="Enter Password"
							value={values.password}
							onChange={handleInputChange}
						/>
						{errors.password ? <span className="error-text">{errors.password[0]}</span> : null}
						{errors.error ? <span className="error-text">{errors.error}</span> : null}

						<button className="custom-btn" onClick={onSubmitSignIn} disabled={isLoading}>
							{isLoading ? "SIGNING IN..." : "SIGN IN"}
						</button>

						<p>
							New Customer? <Link to={`/sign-up${search}`}>Register</Link>
						</p>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
}