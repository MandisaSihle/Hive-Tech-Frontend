
import API from "../../API";
import {
	addCartAction,
	clearCartsAction,
	fetchCartsAction,
	removeCartAction,
	updateCartAction,
} from "./actions";

const api = new API();


// ================= FETCH CARTS =================
export const fetchCarts = () => {
	return (dispatch) => {
		return api.getCarts().then((res) => {
			// 🔥 res is already data (because of interceptor)

			const carts = Array.isArray(res) ? res : res?.carts || [];

			dispatch(fetchCartsAction(carts));
		});
	};
};


// ================= ADD CART =================
export const addCart = (addCartBody) => {
	return (dispatch) => {
		return api.addCart(addCartBody).then((res) => {
			dispatch(addCartAction(res));
		});
	};
};


// ================= UPDATE CART =================
export const updateCart = (updateCartBody, cartId) => {
	return (dispatch) => {
		return api.updateCart(updateCartBody, cartId).then((res) => {
			dispatch(updateCartAction(res));
		});
	};
};


// ================= REMOVE CART =================
export const removeCart = (cartId) => {
	return (dispatch) => {
		dispatch(removeCartAction(cartId));
	};
};


// ================= CLEAR CARTS =================
export const clearCarts = () => {
	return (dispatch) => {
		dispatch(clearCartsAction());
	};
};