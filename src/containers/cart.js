import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CartCard from "../components/cart/CartCard";
import Footer from "../components/default/Footer";
import Header from "../components/default/Header";

import { fetchCarts } from "../reduxs/cart/operations";
import { getCarts } from "../reduxs/cart/selectors";
import { clearCheckoutOrderErrorAction } from "../reduxs/order/actions";
import { getUser } from "../reduxs/users/selectors";

export default function Cart() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const state = useSelector((state) => state);

	const carts = getCarts(state) || {
		results: [],
		totalPrice: 0,
		totalCart: 0,
	};

	const user = getUser(state);

	const cartItems = carts.results || [];
	const isEmpty = cartItems.length === 0;

	useEffect(() => {
		if (user?.token) {
			dispatch(fetchCarts());
		}
	}, [dispatch, user]);

	// ================= NOT LOGGED IN =================
	if (!user?.token) {
		return (
			<>
				<Header />
				<section className="main-wrapper">
					<div className="cart">
						<p className="title">My Cart</p>
						<p>Please sign in to view your cart.</p>
						<button
							onClick={() => navigate("/sign-in")}
							className="custom-btn"
						>
							Sign In
						</button>
					</div>
				</section>
				<Footer />
			</>
		);
	}

	// ================= CART PAGE =================
	return (
		<>
			<Header totalCart={carts.totalCart || 0} />

			<section className="main-wrapper">
				<div className="cart">
					<p className="title">My Cart(s)</p>

					{isEmpty ? (
						<>
							<p>
								Cart is empty. Please go shopping to add products.
							</p>
							<button onClick={() => navigate("/")} className="custom-btn">
								Go to Shopping
							</button>
						</>
					) : (
						<>
							<div className="cart-container">
								{cartItems.map((cart) => (
									<CartCard key={cart.id} cart={cart} />
								))}
							</div>

							<hr className="cart-line" />

							<div className="total-cart">
								<div>
									<div className="sub-total">
										<p>SUBTOTAL:</p>
										<p>$ {carts.totalPrice || 0}</p>
									</div>

									<div className="total-item">
										<p>ITEM(S):</p>
										<p>{carts.totalCart || 0}</p>
									</div>

									<button
										onClick={() => {
											navigate("/checkout");
											dispatch(clearCheckoutOrderErrorAction());
										}}
										className="proceed-checkout"
									>
										PROCEED TO CHECKOUT
									</button>
								</div>
							</div>
						</>
					)}
				</div>
			</section>

			<Footer />
		</>
	);
}