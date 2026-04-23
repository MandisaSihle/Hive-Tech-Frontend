import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";

import Logo from "../../assets/images/HIVETechwear.svg";
import { getUser } from "../../reduxs/users/selectors";
import CartLink from "./CartLink";
import Search from "./Search";
import SignInLink from "./SignInLink";
import SignOutLink from "./SignOutLink";
import SignUpLink from "./SignUpLink";

export default function Header(props) {
    const { totalCart, setSearch, setPage } = props;
    const location = useLocation();
    const { pathname } = location;
    const user = useSelector(getUser);
    const token = user ? user.token : null;

    return (
        <header className="header">
            <Link to="/">
                <img className="logo" src={Logo} alt="HIVETechwear" />
            </Link>

            <div className="header-right">
                <ul className="menu_box">
                    {pathname === "/sign-in" ? (
                        <SignUpLink />
                    ) : pathname === "/sign-up" ? (
                        <SignInLink />
                    ) : token ? (
                        <>
                            {setSearch && <Search setSearch={setSearch} setPage={setPage} />}
                            <CartLink totalCart={totalCart} />
                            <SignOutLink />
                        </>
                    ) : (
                        <>
                            <SignInLink />
                            <SignUpLink />
                        </>
                    )}
                </ul>
            </div>
        </header>
    );
}