import React from "react";
import { Link } from "react-router-dom";
import signInIcon from '../../assets/images/sign-in.png';

export default function signInLink() {
    return(
        <li>
            <Link className="menu_item" to="/sign-in">
            <img className="sign-in-icon"
            src={ signInIcon }
            alt=""
            />
            Sign In
            </Link>
        </li>
    );
}