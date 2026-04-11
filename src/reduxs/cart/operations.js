// import API from "../../API";
// import { 
//     addCartAction, 
//     clearCartsAction, 
//     fetchCartsAction, 
//     removeCartAction, 
//     updateCartAction 
// } from "./actions";

// const api = new API();

// export const fetchCarts = () => {
//     return (dispatch) => {
//         return api.getCarts().then((carts) => {
//             dispatch(fetchCartsAction(carts));
//         });
//     };
// };

// export const addCart = (addCartBody) => {
//     return (dispatch) => {
//         return api.addCart(addCartBody).then((cart) => {
//             dispatch(addCartAction(cart));
//         });
//     };
// };

// export const updateCart = (updateCartBody, cartId) => {
//     return (dispatch) => {
//         return api.updateCart(updateCartBody, cartId).then((cart) => {
//             dispatch(updateCartAction(cart));
//         });
//     };
// };

// export const removeCart = (cartId) => {
//     return (dispatch) => {
//         dispatch(removeCartAction(cartId));
//     };
// };

// export const clearCarts = () => {
//     return (dispatch) => {
//         dispatch(clearCartsAction());
//     };
// };

// import api from "../../API"; // API is now an instance, so we can name it 'api'
// import { 
//     addCartAction, 
//     clearCartsAction, 
//     fetchCartsAction, 
//     removeCartAction, 
//     updateCartAction 
// } from "./actions";

// // ✅ FIX: Removed 'const api = new API();' because the instance is already exported

// export const fetchCarts = () => {
//     return (dispatch) => {
//         return api.getCarts()
//             .then((carts) => {
//                 dispatch(fetchCartsAction(carts));
//             })
//             .catch((error) => {
//                 console.error("Fetch Carts Error:", error);
//             });
//     };
// };

// export const addCart = (addCartBody) => {
//     return (dispatch) => {
//         return api.addCart(addCartBody)
//             .then((cart) => {
//                 dispatch(addCartAction(cart));
//             })
//             .catch((error) => {
//                 console.error("Add Cart Error:", error);
//             });
//     };
// };

// export const updateCart = (updateCartBody, cartId) => {
//     return (dispatch) => {
//         return api.updateCart(updateCartBody, cartId)
//             .then((cart) => {
//                 dispatch(updateCartAction(cart));
//             })
//             .catch((error) => {
//                 console.error("Update Cart Error:", error);
//             });
//     };
// };

// export const removeCart = (cartId) => {
//     return (dispatch) => {
//         // Typically, you'd want to call api.deleteCart(cartId) here too
//         // if your backend needs to persist the removal.
//         dispatch(removeCartAction(cartId));
//     };
// };

// export const clearCarts = () => {
//     return (dispatch) => {
//         dispatch(clearCartsAction());
//     };
// };

// import api from "../../API";
// import {
// 	addCartAction,
// 	clearCartsAction,
// 	fetchCartsAction,
// 	removeCartAction,
// 	updateCartAction,
// } from "./actions";

// export const fetchCarts = () => {
// 	return async (dispatch) => {
// 		try {
// 			const carts = await api.getCarts();
// 			dispatch(fetchCartsAction({ carts }));
// 		} catch (error) {
// 			console.error("Fetch Carts Error:", error);
// 		}
// 	};
// };

// export const addCart = (addCartBody) => {
// 	return async (dispatch) => {
// 		try {
// 			const cart = await api.addCart(addCartBody);
// 			dispatch(addCartAction({ cart }));
// 		} catch (error) {
// 			console.error("Add Cart Error:", error);
// 		}
// 	};
// };

// export const updateCart = (updateCartBody, cartId) => {
// 	return async (dispatch) => {
// 		try {
// 			const cart = await api.updateCart(updateCartBody, cartId);
// 			dispatch(updateCartAction({ cart }));
// 		} catch (error) {
// 			console.error("Update Cart Error:", error);
// 		}
// 	};
// };

// export const removeCart = (cartId) => {
// 	return async (dispatch) => {
// 		try {
// 			if (api.deleteCart) {
// 				await api.deleteCart(cartId);
// 			}
// 			dispatch(removeCartAction({ cartId }));
// 		} catch (error) {
// 			console.error("Remove Cart Error:", error);
// 		}
// 	};
// };

// export const clearCarts = () => {
// 	return (dispatch) => {
// 		dispatch(clearCartsAction());
// 	};
// };

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