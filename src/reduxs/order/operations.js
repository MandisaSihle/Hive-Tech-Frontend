import API from "../../API";
import {
	checkoutOrderAction,
	checkoutOrderErrorAction,
	clearCheckoutOrderErrorAction,
} from "./actions";

const api = new API();


// ================= CHECKOUT ORDER =================
export const checkoutOrder = (orderData, onSuccess = null) => {
	return async (dispatch) => {
		try {
			// 🔥 call API
			const res = await api.checkoutOrder(orderData);

			// 🔥 success action
			dispatch(checkoutOrderAction(res));

			// 🔥 clear previous errors (optional but recommended)
			dispatch(clearCheckoutOrderErrorAction());

			// 🔥 callback (navigation etc.)
			if (onSuccess) onSuccess(res);

			return res;
		} catch (error) {
			console.log("CHECKOUT ERROR:", error);

			dispatch(
				checkoutOrderErrorAction(
					error?.response?.data || {
						error: "Checkout failed. Please try again.",
					}
				)
			);

			throw error;
		}
	};
};