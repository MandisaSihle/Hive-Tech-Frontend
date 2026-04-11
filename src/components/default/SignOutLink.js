// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { LOGIN_USER_KEY } from "../../API";
// import ReactDOM from "react-dom";

// import SignOutIcon from "../../assets/images/sign-out.png";
// import { signOutAction } from "../../reduxs/users/actions";

// export default function SignOutLink() {
// 	const dispatch = useDispatch();
// 	const navigate = useNavigate();
// 	const [openModalSignOut, setOpenModalSignOut] = useState(false);

// 	return (
// 		<>
// 			<li onClick={() => setOpenModalSignOut(true)}>
// 				<Link className="menu__item" to="#">
// 					<img className="sign-out-icon" src={SignOutIcon} alt="" />
// 					Sign Out
// 				</Link>
// 			</li>

// 			{openModalSignOut
// 				? ReactDOM.createPortal(
// 						<div id="custom-modal" className={`custom-modal ${openModalSignOut ? "" : "modal-hide"}`}>
// 							<div
// 								id="custom-modal-close"
// 								onClick={() => setOpenModalSignOut(false)}
// 								className="custom-modal--bg"
// 							></div>

// 							<div className="custom-modal--container">
// 								<div className="custom-modal--content">
// 									<div className="modal-content">
// 										<strong>Are you sure to log out?</strong>
// 										<div>
// 											<button
// 												className="custom-btn mr-1 pl-6 pr-6"
// 												onClick={() => {
// 													dispatch(signOutAction());
// 													localStorage.removeItem(LOGIN_USER_KEY);
// 													setOpenModalSignOut(false);
// 													navigate("/");
// 												}}
// 											>
// 												Yes
// 											</button>

// 											<button
// 												className="custom-btn ml-1 pl-6 pr-6"
// 												onClick={() => setOpenModalSignOut(false)}
// 											>
// 												No
// 											</button>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						</div>,
// 						document.getElementById("portal-root")
// 				  )
// 				: null}
// 		</>
// 	);
// }

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";

import { LOGIN_USER_KEY } from "../../API";
import SignOutIcon from "../../assets/images/sign-out.png";
import { signOutAction } from "../../reduxs/users/actions";

export default function SignOutLink() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [openModalSignOut, setOpenModalSignOut] = useState(false);

	const portalRoot = document.getElementById("portal-root");

	const handleSignOut = () => {
		dispatch(signOutAction());
		localStorage.removeItem(LOGIN_USER_KEY);
		setOpenModalSignOut(false);
		navigate("/");
	};

	const modalContent = (
		<div id="custom-modal" className="custom-modal">
			<div
				id="custom-modal-close"
				onClick={() => setOpenModalSignOut(false)}
				className="custom-modal--bg"
			></div>

			<div className="custom-modal--container">
				<div className="custom-modal--content">
					<div className="modal-content">
						<strong>Are you sure you want to log out?</strong>

						<div>
							<button
								type="button"
								className="custom-btn mr-1 pl-6 pr-6"
								onClick={handleSignOut}
							>
								Yes
							</button>

							<button
								type="button"
								className="custom-btn ml-1 pl-6 pr-6"
								onClick={() => setOpenModalSignOut(false)}
							>
								No
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<>
			<li>
				<button
					type="button"
					className="menu__item signout-trigger"
					onClick={() => setOpenModalSignOut(true)}
					style={{
						background: "none",
						border: "none",
						padding: 0,
						cursor: "pointer",
					}}
				>
					<img className="sign-out-icon" src={SignOutIcon} alt="" />
					Sign Out
				</button>
			</li>

			{openModalSignOut && portalRoot
				? ReactDOM.createPortal(modalContent, portalRoot)
				: openModalSignOut
				? modalContent
				: null}
		</>
	);
}