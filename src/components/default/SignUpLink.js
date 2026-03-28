import React from "react";
import { Link } from "react-router-dom";
import signUpIcon from '../../assets/images/sign-up.png';

export default function signUpLink() {
    return(
        <li>
            <Link className="menu_item" to="/sign-up">
            <img className="sign-up-icon"
            src={ signUpIcon }
            alt=""
            />
            Sign Up
            </Link>
        </li>
    );
}