export const FETCH_CARTS = "FETCH_CARTS";
export const ADD_CART = "ADD_CART";
export const UPDATE_CART = "UPDATE_CART";
export const REMOVE_CART = "REMOVE_CART";
export const CLEAR_CARTS = "CLEAR_CARTS";


// ================= FETCH CARTS =================
// Expecting: API returns array OR object -> normalize in reducer OR here
export const fetchCartsAction = (carts) => {
	return {
		type: FETCH_CARTS,
		payload: {
			carts: carts || [],
		},
	};
};


// ================= ADD CART =================
// IMPORTANT: pass API response directly (NO { cart } wrapper needed anymore)
export const addCartAction = (cart) => {
	return {
		type: ADD_CART,
		payload: {
			cart: cart || null,
		},
	};
};


// ================= UPDATE CART =================
export const updateCartAction = (cart) => {
	return {
		type: UPDATE_CART,
		payload: {
			cart: cart || null,
		},
	};
};


// ================= REMOVE CART =================
export const removeCartAction = (cartId) => {
	return {
		type: REMOVE_CART,
		payload: {
			cartId,
		},
	};
};


// ================= CLEAR CARTS =================
export const clearCartsAction = () => {
	return {
		type: CLEAR_CARTS,
	};
};