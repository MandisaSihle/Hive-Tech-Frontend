import api from "../../API";
import {
	addCartAction,
	clearCartsAction,
	fetchCartsAction,
	removeCartAction,
	updateCartAction,
} from "./actions";

export const fetchCarts = () => {
	return async (dispatch) => {
		try {
			const carts = await api.getCarts();
			dispatch(fetchCartsAction({ carts }));
		} catch (error) {
			console.error("Fetch Carts Error:", error);
		}
	};
};

export const addCart = (addCartBody) => {
	return async (dispatch) => {
		try {
			const cart = await api.addCart(addCartBody);
			dispatch(addCartAction({ cart }));
		} catch (error) {
			console.error("Add Cart Error:", error);
		}
	};
};

export const updateCart = (updateCartBody, cartId) => {
	return async (dispatch) => {
		try {
			const cart = await api.updateCart(updateCartBody, cartId);
			dispatch(updateCartAction({ cart }));
		} catch (error) {
			console.error("Update Cart Error:", error);
		}
	};
};

export const removeCart = (cartId) => {
	return async (dispatch) => {
		try {
			await api.deleteCart(cartId);
			dispatch(removeCartAction({ cartId }));
		} catch (error) {
			console.error("Remove Cart Error:", error);
		}
	};
};

export const clearCarts = () => {
	return (dispatch) => {
		dispatch(clearCartsAction());
	};
};