
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Empty from "../components/default/Empty";
import Footer from "../components/default/Footer";
import Header from "../components/default/Header";
import OrderListCard from "../components/order/orderListCard";

import { fetchCarts, clearCarts } from "../reduxs/cart/operations";
import { getCarts } from "../reduxs/cart/selectors";
import { checkoutOrder } from "../reduxs/order/operations"; // ✅ FIXED (IMPORTANT)
import { clearCheckoutOrderErrorAction } from "../reduxs/order/actions";
import { getOrders } from "../reduxs/order/selectors";
import { getUser } from "../reduxs/users/selectors";

export default function Checkout() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const selector = useSelector((state) => state);

	const user = getUser(selector);
	const carts = getCarts(selector);
	const errors = getOrders(selector)?.errors || {};

	const [isLoading, setIsLoading] = useState(false);

	const isEmpty = !carts?.results || carts.results.length === 0;

	// ================= FETCH CARTS =================
	useEffect(() => {
		if (user?.token) {
			dispatch(fetchCarts());
		}
	}, [dispatch, user]);

	// ================= ORDER ITEMS =================
	const order_items = (carts?.results || []).map((cart) => ({
		qty: cart.quantity,
		product: cart.product.id,
	}));

	// ================= FORM STATE =================
	const initialValues = {
		customer_name: user?.name || "",
		customer_phone: "",
		address: "",
		pin_code: "",
		building_type: "",
		city: "",
		state: "",
	};

	const [values, setValues] = useState(initialValues);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setValues((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// ================= SUBMIT CHECKOUT =================
	const onSubmitCheckout = async () => {
		setIsLoading(true);

		try {
			await dispatch(
				checkoutOrder(
					{
						...values,
						total_price: carts?.totalPrice || 0,
						total_qty: carts?.totalCartItems || 0,
						order_items,
					},
					() => {
						console.log("NAVIGATE NOW");
						dispatch(clearCarts());
						dispatch(clearCheckoutOrderErrorAction());
						navigate("/Thank-you");
					}
				)
			);
		} catch (error) {
			console.log("Checkout Error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	// ================= UI =================
	return (
		<>
			<Header totalCart={carts?.totalCart || 0} />

			<section className="main-wrapper">
				<div className="checkout">
					<p className="title">My Items Detail</p>

					{/* EMPTY CART */}
					{isEmpty ? (
						<>
							<p>
								Cart is empty. Please go to shopping in order to add product to cart.
							</p>
							<button
								onClick={() => navigate("/")}
								className="custom-btn"
							>
								Go to Shopping
							</button>
						</>
					) : (
						<>
							<p>Please check your items and confirm it</p>

							{/* CART ITEMS */}
							<div className="order-detail">
								{carts?.results?.length > 0 ? (
									carts.results.map((cart) => (
										<OrderListCard
											key={cart.id}
											orderItem={cart}
										/>
									))
								) : (
									<Empty />
								)}
							</div>

							<hr className="checkout-line" />

							{/* TOTAL */}
							<div className="total-order">
								<p>Total Items</p>
								<p>{carts?.totalCartItems || 0}</p>

								<p>Total Price</p>
								<p>${carts?.totalPrice || 0}</p>
							</div>

							{/* FORM */}
							<div className="checkout-form-container">
								<input
									name="customer_name"
									value={values.customer_name}
									onChange={handleInputChange}
									className="custom-input"
									placeholder="Full Name"
								/>
								{errors.customer_name && (
									<span className="error-text">
										{errors.customer_name[0]}
									</span>
								)}

								<input
									name="customer_phone"
									value={values.customer_phone}
									onChange={handleInputChange}
									className="custom-input"
									placeholder="Phone Number"
								/>

								<input
									name="address"
									value={values.address}
									onChange={handleInputChange}
									className="custom-input"
									placeholder="Address"
								/>

								<input
									name="pin_code"
									value={values.pin_code}
									onChange={handleInputChange}
									className="custom-input"
									placeholder="PIN Code"
								/>

								<input
									name="building_type"
									value={values.building_type}
									onChange={handleInputChange}
									className="custom-input"
									placeholder="Building Info"
								/>

								<input
									name="city"
									value={values.city}
									onChange={handleInputChange}
									className="custom-input"
									placeholder="City"
								/>

								<input
									name="state"
									value={values.state}
									onChange={handleInputChange}
									className="custom-input"
									placeholder="State"
								/>

								{/* SUBMIT */}
								<button
									onClick={onSubmitCheckout}
									className="custom-btn"
									disabled={isLoading}
								>
									{isLoading
										? "Submitting Order..."
										: "Confirm and Submit"}
								</button>
							</div>
						</>
					)}
				</div>
			</section>

			<Footer />
		</>
	);
}