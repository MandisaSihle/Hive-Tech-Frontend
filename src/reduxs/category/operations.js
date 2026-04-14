// import api from "../../API";
// import { fetchCategoriesAction } from "./actions";

// const api = new API();

// export const fetchCategories = () => {
// 	return async (dispatch) => {
// 		try {
// 			const response = await api.getCategories();
			

// 			const categories = Array.isArray(response)
// 				? response
// 				: response?.results || [];

// 			dispatch(fetchCategoriesAction(categories));
// 			console.log("CATEGORIES:", response);
// 		} catch (error) {
// 			console.error("Fetch Categories Error:", error);
// 		}
// 	};
// };

import API from "../../API";
import { fetchCategoriesAction } from "./actions";

const api = new API();

export const fetchCategories = () => {
	return async (dispatch) => {
		return api.getCategories().then((categories) => {
			dispatch(fetchCategoriesAction(categories));
		});
	};
};
