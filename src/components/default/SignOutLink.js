import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; 
import { LOGIN_USER_KEY } from "../../API";
import ReactDOM from "react-dom";

import SignOutIcon from "../../assets/images/sign-out.png";
import { signOutAction } from "../../reduxs/users/actions";

export default function SignOutLink() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModalSignOut, setOpenModalSignOut] = useState(false);

  // Define the target for the portal
  const portalTarget = document.getElementById("portal-root");

  const handleSignOut = () => {
    dispatch(signOutAction());
    localStorage.removeItem(LOGIN_USER_KEY);
    setOpenModalSignOut(false);
    navigate("/");
  };

  return (
    <>
      <li onClick={() => setOpenModalSignOut(true)}>
        <Link className="menu_item" to="#">
          <img className="sign-out-icon" src={SignOutIcon} alt="Sign Out" />
          Sign Out
        </Link>
      </li>

      {openModalSignOut && portalTarget
        ? ReactDOM.createPortal(
            <div id="custom-modal" className="custom-modal">
              <div
                id="custom-modal-close"
                onClick={() => setOpenModalSignOut(false)}
                className="custom-modal--bg"
              ></div>
              <div className="custom-modal--container">
                <div className="custom-modal--content">
                  <div className="modal-content">
                    <strong>Are you sure to log out?</strong>
                    <div style={{ marginTop: "20px" }}>
                      <button
                        className="custom-btn mr-1 pl-6 pr-6"
                        onClick={handleSignOut}
                      >
                        Yes
                      </button>
                      <button
                        className="custom-btn ml-1 pl-6 pr-6"
                        onClick={() => setOpenModalSignOut(false)}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>,
            portalTarget
          )
        : null}
    </>
  );
}