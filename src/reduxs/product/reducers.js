
import initialState from "../store/initialState";
import * as Actions from "./actions";

export const ProductsReducer = (state = initialState.products, action) => {
	switch (action.type) {
		case Actions.FETCH_PRODUCTS: {
			const products = action.payload?.products || {};

			return {
				...state,
				...products,
				results: products.results || [],
			};
		}

		default:
			return state;
	}
};