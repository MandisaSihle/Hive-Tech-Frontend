// import initialState from "../store/initialState";
// import * as Actions from "./actions";

// export const CategoriesReducer = (state = initialState.categories, action) => {
// 	switch (action.type) {
// 		case Actions.FETCH_CATEGORIES:
// 			return {
// 				...state,
// 				results: [...action.payload.categories],
// 			};
// 		default:
// 			return state;
// 	}
// };

// import initialState from "../store/initialState";
// import * as Actions from "./actions";

// export const CategoriesReducer = (state = initialState.category, action) => {
// 	switch (action.type) {
// 		case Actions.FETCH_CATEGORIES:
// 			return {
// 				...state,
// 				results: action.payload?.categories || [],
// 			};

// 		default:
// 			return state;
// 	}
// };

import initialState from "../store/initialState";
import * as Actions from "./actions";

export const CategoriesReducer = (state = initialState.category, action) => {
	switch (action.type) {
		case Actions.FETCH_CATEGORIES:
			return {
				...state,
				results: action.payload || [],
			};

		default:
			return state;
	}
};