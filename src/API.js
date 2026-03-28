import axios from "axios";

export const LOGIN_USER_KEY = "HIVE_TECHWEAR_LOGIN_USER_KEY";

const baseURL = "http://127.0.0.1:8000/"; 

const api = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application",
    },
});

api.interceptors.request.use(
    (config) => {
        if (config.requireToken) {
            const user = localStorage.getItem(LOGIN_USER_KEY)
                ? JSON.parse(localStorage.getItem(LOGIN_USER_KEY))
                : null;
            config.headers.common["Authorization"] = user.token;
        }

        return config;
    },
    (err) => console.error(err)
);

api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default class API {
    signUp = async (signUpBody) => {
        const formData = new FormData();

        for (const key in signUpBody) {
            formData.append(key, signUpBody[key]);
        }

        return api.post("/users/signup/", formData);
    };

    signIn = async (signInBody) => {
        const formData = new FormData();

        for (const key in signInBody) {
            formData.append(key, signInBody[key]);
        }

        return api.post("/users/signin/", formData);
    };

    // Category
    getCategories = () => {
        return api.get("/categories/");
    };

    // Product
    getProducts = (query = {}) => {
        return api.get("/products/", { params: query, requireToken: true });
    };

    // Cart
    getCarts = (query = {}) => {
        return api.get("/carts/", { params: query, requireToken: true });
    };
}