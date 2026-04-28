
import axios from "axios";

export const LOGIN_USER_KEY = "HIVE_TECHWEAR_LOGIN_USER_KEY";

// const baseURL = "http://127.0.0.1:8000/";
const baseURL = "https://hive-tech-backend-atqj.onrender.com"

const api = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
	},
});


// ✅ REQUEST INTERCEPTOR (Attach token)
api.interceptors.request.use(
	(config) => {
		const userData = localStorage.getItem(LOGIN_USER_KEY);
		const user = userData ? JSON.parse(userData) : null;

		if (user?.token) {
			config.headers = config.headers || {};
			config.headers["Authorization"] = String(user.token).trim();
		}

		return config;
	},
	(error) => Promise.reject(error)
);


// ✅ RESPONSE INTERCEPTOR (IMPORTANT CHANGE)
api.interceptors.response.use(
	(response) => {
		// 🔥 Always return clean data
		return response?.data ?? response;
	},
	(error) => {
		console.log("API ERROR:", error?.response || error);

		if (error?.response?.status === 401) {
			localStorage.removeItem(LOGIN_USER_KEY);
		}

		return Promise.reject(error);
	}
);


// ✅ API CLASS
export default class API {

	// ================= AUTH =================
	signUp = async (signUpBody) => {
		const formData = new FormData();

		for (const key in signUpBody) {
			formData.append(key, signUpBody[key]);
		}

		return await api.post("/users/signup/", formData);
	};

	signIn = async (signInBody) => {
		const formData = new FormData();

		for (const key in signInBody) {
			formData.append(key, signInBody[key]);
		}

		return await api.post("/users/signin/", formData);
	};


	// ================= CATEGORY =================
	getCategories = async () => {
		return await api.get("/categories/");
	};


	// ================= PRODUCT =================
	getProducts = async (params = {}) => {
		return await api.get("/products/", { params });
	};


	// ================= CART =================
	getCarts = async (params = {}) => {
		return await api.get("/carts/", { params });
	};

	addCart = async (data) => {
		return await api.post("/carts/add/", data);
	};

	updateCart = async (body, cartId) => {
		return await api.put(`/carts/${cartId}/`, body);
	};

	deleteCart = async (cartId) => {
		return await api.delete(`/carts/${cartId}/`);
	};



	// ================= ADD THIS =================
	checkoutOrder = (data) => {
		return api.post("/orders/add/", data);
	};
}