// import axios from "axios";

// export const LOGIN_USER_KEY = "HIVE_TECHWEAR_LOGIN_USER_KEY";

// const baseURL = "http://127.0.0.1:8000/";

// const api = axios.create({
//   baseURL: baseURL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });


// api.interceptors.request.use(
//   (config) => {
//     if (config.requireToken) {
//       const raw = localStorage.getItem(LOGIN_USER_KEY);
//       const user = raw ? JSON.parse(raw) : null;

//       if (user?.token) {
//         config.headers = config.headers || {};
//         config.headers.Authorization = `Bearer ${user.token}`;
//       }
//     }

//     return config;
//   },
//   (err) => Promise.reject(err)
// );

// api.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default class API {
//   signUp = async (signUpBody) => {
//     const formData = new FormData();

//     for (const key in signUpBody) {
//       formData.append(key, signUpBody[key]);
//     }

//     return api.post("/users/signup/", formData);
//   };

//   signIn = async (signInBody) => {
//     const formData = new FormData();

//     for (const key in signInBody) {
//       formData.append(key, signInBody[key]);
//     }

//     return api.post("/users/signin/", formData);
//   };

//   // Category
//   getCategories = () => {
//     return api.get("/categories/");
//   };

//   // Product
//   getProducts = (query = {}) => {
//     return api.get("/products/", { params: query, requireToken: true });
//   };

//   // Cart
//   getCarts = (query = {}) => {
//     return api.get("/carts/", { params: query, requireToken: true });
//   };
// }

import axios from "axios";

export const LOGIN_USER_KEY = "HIVE_TECHWEAR_LOGIN_USER_KEY";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    // Attach token if required
    if (config._requireToken) {
      const raw = localStorage.getItem(LOGIN_USER_KEY);
      const user = raw ? JSON.parse(raw) : null;

      if (user?.token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }

    // IMPORTANT: Let browser set Content-Type for FormData
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (err) => Promise.reject(err)
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Useful debug
    console.error("API ERROR:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default class API {
  // AUTH
  signUp = (body) => {
    const formData = new FormData();
    Object.keys(body).forEach((key) => formData.append(key, body[key]));

    return api.post("/users/signup/", formData);
  };

  signIn = (body) => {
    const formData = new FormData();
    Object.keys(body).forEach((key) => formData.append(key, body[key]));

    return api.post("/users/signin/", formData);
  };

  // CATEGORY
  getCategories = () => {
    return api.get("/categories/");
  };

  // PRODUCT (protected)
  getProducts = (query = {}) => {
    return api.get("/products/", {
      params: query,
      _requireToken: true,
    });
  };

  // CART (protected)
  getCarts = (query = {}) => {
    return api.get("/carts/", {
      params: query,
      _requireToken: true,
    });
  };
}