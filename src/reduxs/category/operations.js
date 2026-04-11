// import API from "../../API";
// import { fetchCategoriesAction } from "./actions";

// const api = new API();

// export const fetchCategories = () => {
//     return async (dispatch) => {
//         return api.getCategories().then((categories) => {
//             dispatch(fetchCategoriesAction(categories));
//         });
//     };
// };

// import api from "../../API"; 
// import { fetchCategoriesAction } from "./actions";


// export const fetchCategories = () => {
//     return (dispatch) => {
//         return api.getCategories()
//             .then((categories) => {
//                 dispatch(fetchCategoriesAction(categories));
//             })
//             .catch((error) => {
//                 console.error("Fetch Categories Error:", error);
//             });
//     };
// };

// import api from "../../API"; 
// import { fetchCategoriesAction } from "./actions"; 

// export const fetchCategories = () => {
//     return (dispatch) => {
//         return api.getCategories()
//             .then((categories) => {
//                 dispatch(fetchCategoriesAction(categories));
//             })
//             .catch((error) => {
//                 console.error("Fetch Categories Error:", error);
//             });
//     };
// };

import api from "../../API";
import { fetchCategoriesAction } from "./actions";

export const fetchCategories = () => {
	return async (dispatch) => {
		try {
			const response = await api.getCategories();

			const categories = Array.isArray(response)
				? response
				: response?.results || [];

			dispatch(fetchCategoriesAction(categories));
		} catch (error) {
			console.error("Fetch Categories Error:", error);
		}
	};
};