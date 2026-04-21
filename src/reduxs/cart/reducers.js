import initialState from "../store/initialState";
import * as Actions from "./actions";

export const CartsReducer = (state = initialState.carts, action) => {
	switch (action.type) {

		// ✅ FETCH CARTS
		case Actions.FETCH_CARTS: {
			const carts = action.payload?.carts || [];

			return {
				...state,
				results: carts.filter(c => c), // 🔥 remove undefined
				totalPrice: getTotalCartPrice(carts),
				totalCart: carts.length,
				totalCartItems: getTotalCartItems(carts),
			};
		}

		// ✅ ADD CART
		case Actions.ADD_CART: {
			const cart = action.payload?.cart;
			if (!cart) return state; // 🔥 protect

			const prevCarts = state.results || [];
			const existingIndex = prevCarts.findIndex((c) => c.id === cart.id);

			// Ensure total_price exists
			if (!cart.total_price && cart.product?.price) {
				cart.total_price = cart.quantity * cart.product.price;
			}

			let newCarts = [...prevCarts];

			if (existingIndex >= 0) {
				newCarts[existingIndex] = cart;
			} else {
				newCarts.push(cart);
			}

			newCarts = newCarts.filter(c => c); // 🔥 extra safety

			return {
				...state,
				results: newCarts,
				totalPrice: getTotalCartPrice(newCarts),
				totalCart: newCarts.length,
				totalCartItems: getTotalCartItems(newCarts),
			};
		}

		// ✅ UPDATE CART
		case Actions.UPDATE_CART: {
			const updatedCart = action.payload?.cart;
			if (!updatedCart) return state; // 🔥 protect

			const prevCarts = state.results || [];

			const newUpdatedCarts = prevCarts.map((cart) => {
				if (!cart) return cart; // 🔥 safety

				if (cart.id === updatedCart.id) {
					return {
						...cart,
						quantity: updatedCart.quantity,
						total_price: updatedCart.quantity * (cart.product?.price || 0),
					};
				}
				return cart;
			}).filter(c => c); // 🔥 remove undefined

			return {
				...state,
				results: newUpdatedCarts,
				totalPrice: getTotalCartPrice(newUpdatedCarts),
				totalCart: newUpdatedCarts.length,
				totalCartItems: getTotalCartItems(newUpdatedCarts),
			};
		}

		// ✅ REMOVE CART
		case Actions.REMOVE_CART: {
			const newRemovedCarts = (state.results || []).filter(
				(cart) => cart && cart.id !== action.payload?.cartId
			);

			return {
				...state,
				results: newRemovedCarts,
				totalPrice: getTotalCartPrice(newRemovedCarts),
				totalCart: newRemovedCarts.length,
				totalCartItems: getTotalCartItems(newRemovedCarts),
			};
		}

		// ✅ CLEAR CARTS
		case Actions.CLEAR_CARTS:
			return {
				...state,
				results: [],
				totalPrice: 0,
				totalCart: 0,
				totalCartItems: 0,
			};

		default:
			return state;
	}
};



// ✅ SAFE TOTAL PRICE
const getTotalCartPrice = (carts = []) => {
	const validCarts = carts.filter(c => c && c.product);

	const totalPrice = validCarts.reduce((prev, cur) => {
		let price = cur.total_price;

		if (!price && cur.product?.price) {
			price = cur.quantity * cur.product.price;
		}

		return prev + (price || 0);
	}, 0);

	return +totalPrice.toFixed(2);
};


// ✅ SAFE TOTAL ITEMS
const getTotalCartItems = (carts = []) => {
	const validCarts = carts.filter(c => c);

	return validCarts.reduce((prev, cur) => {
		return prev + (cur.quantity || 0);
	}, 0);
};