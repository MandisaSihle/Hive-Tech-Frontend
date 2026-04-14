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

// import axios from "axios";

// export const LOGIN_USER_KEY = "HIVE_TECHWEAR_LOGIN_USER_KEY";

// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000/",
// });

// // REQUEST INTERCEPTOR
// api.interceptors.request.use(
//   (config) => {
//     const raw = localStorage.getItem(LOGIN_USER_KEY);
//     const user = raw ? JSON.parse(raw) : null;
    
//     // Check for both common token keys
//     const token = user?.token || user?.access;

//     if (token) {
//       config.headers = config.headers || {};
//       // For standard Django Rest Framework, use 'Token'
//       // For JWT, use 'Bearer'
//       config.headers.Authorization = `Token ${token}`;
//     }

//     if (!(config.data instanceof FormData)) {
//       config.headers["Content-Type"] = "application/json";
//     }

//     return config;
//   },
//   (err) => Promise.reject(err)
// );

// // RESPONSE INTERCEPTOR
// api.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     console.error("API ERROR:", error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// class API {
//   // AUTH
//   signUp = (body) => {
//     return api.post("/users/signup/", body);
//   };

//   signIn = (body) => {
//     return api.post("/users/signin/", body);
//   };

//   // CATEGORY
//   getCategories = () => {
//     return api.get("/categories/");
//   };

//   // PRODUCT
//   getProducts = (params = {}) => {
//     return api.get("/products/", { params });
//   };

//   // CART
//   getCarts = (params = {}) => {
//     return api.get("/carts/", { params });
//   };
// }

// const apiInstance = new API();
// export default apiInstance;

// import axios from "axios";

// export const LOGIN_USER_KEY = "HIVE_TECHWEAR_LOGIN_USER_KEY";

// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000/",
// });

// REQUEST INTERCEPTOR
// api.interceptors.request.use(
//   (config) => {
//     const raw = localStorage.getItem(LOGIN_USER_KEY);
//     const user = raw ? JSON.parse(raw) : null;
    
//     // Check for both common token keys
//     const token = user?.token || user?.access;

//     if (token) {
//       config.headers = config.headers || {};
//       // For standard Django Rest Framework, use 'Token'
//       // For JWT, use 'Bearer'
//       config.headers.Authorization = `Token ${token}`;
//     }

//     if (!(config.data instanceof FormData)) {
//       config.headers["Content-Type"] = "application/json";
//     }

//     return config;
//   },
//   (err) => Promise.reject(err)
// );

// // RESPONSE INTERCEPTOR
// api.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     console.error("API ERROR:", error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// class API {
//   // AUTH
//   signUp = (body) => {
//     return api.post("/users/signup/", body);
//   };

//   signIn = (body) => {
//     return api.post("/users/signin/", body);
//   };

//   // CATEGORY
//   getCategories = () => {
//     return api.get("/categories/");
//   };

//   // PRODUCT
//   getProducts = (params = {}) => {
//     return api.get("/products/", { params });
//   };

//   // CART
//   getCarts = (params = {}) => {
//     return api.get("/carts/", { params });
//   };
// }

// const apiInstance = new API();
// export default apiInstance;

// import axios from "axios";

// export const LOGIN_USER_KEY = "HIVE_TECHWEAR_LOGIN_USER_KEY";

// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000/",
// });

// // ✅ REQUEST INTERCEPTOR
// api.interceptors.request.use(
//   (config) => {
//     const raw = localStorage.getItem(LOGIN_USER_KEY);
//     const user = raw ? JSON.parse(raw) : null;

//     if (user) {
//       config.headers = config.headers || {};

//       // ✅ Handle BOTH JWT and DRF Token
//       if (user.access) {
//         // JWT Authentication
//         config.headers.Authorization = `Bearer ${user.access}`;
//       } else if (user.token) {
//         // Django Token Authentication
//         config.headers.Authorization = `Token ${user.token}`;
//       }
//     }

//     // ✅ Set content type (except for FormData)
//     if (!(config.data instanceof FormData)) {
//       config.headers["Content-Type"] = "application/json";
//     }

//     return config;
//   },
//   (err) => Promise.reject(err)
// );

// // ✅ RESPONSE INTERCEPTOR
// api.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     console.error("API ERROR:", error.response?.data || error.message);

//     // ✅ Handle 401 globally (optional)
//     if (error.response && error.response.status === 401) {
//       console.warn("Unauthorized! Redirecting to login...");

//       // Optional: clear invalid user
//       localStorage.removeItem(LOGIN_USER_KEY);

//       // Optional: redirect
//       // window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   }
// );

// class API {
//   // 🔐 AUTH
//   signUp = (body) => {
//     return api.post("/users/signup/", body);
//   };

//   signIn = (body) => {
//     return api.post("/users/signin/", body);
//   };

//   // 📂 CATEGORY
//   getCategories = () => {
//     return api.get("/categories/");
//   };

//   // 🛍 PRODUCT
//   getProducts = (params = {}) => {
//     return api.get("/products/", { params });
//   };

//   // 🛒 CART
//   getCarts = (params = {}) => {
//     return api.get("/carts/", { params });
//   };
// }

// const apiInstance = new API();
// export default apiInstance;

// import axios from "axios";

// export const LOGIN_USER_KEY = "HIVE_TECHWEAR_LOGIN_USER_KEY";

// const api = axios.create({
// 	baseURL: "http://127.0.0.1:8000/",
// });

// // REQUEST INTERCEPTOR
// // api.interceptors.request.use(
// // 	(config) => {
// // 		const raw = localStorage.getItem(LOGIN_USER_KEY);
// // 		const user = raw ? JSON.parse(raw) : null;

// // 		if (user) {
// // 			config.headers = config.headers || {};

// // 			if (user.access) {
// // 				config.headers.Authorization = `Bearer ${user.access}`;
// // 			} else if (user.token) {
// // 				config.headers.Authorization = `Token ${user.token}`;
// // 			}
// // 		}

// // 		if (!(config.data instanceof FormData)) {
// // 			config.headers["Content-Type"] = "application/json";
// // 		}

// // 		return config;
// // 	},
// // 	(err) => Promise.reject(err)
// // );


// api.interceptors.request.use(
//   (config) => {
//     const raw = localStorage.getItem(LOGIN_USER_KEY);
//     const user = raw ? JSON.parse(raw) : null;

//     if (user && user.token) {
//       config.headers = config.headers || {};
//       config.headers.Authorization = `Token ${user.token}`;
//     }

//     if (!(config.data instanceof FormData)) {
//       config.headers["Content-Type"] = "application/json";
//     }

//     return config;
//   },
//   (err) => Promise.reject(err)
// );




import axios from "axios";
// require('dotenv').config()

export const LOGIN_USER_KEY = "HIVE_TECHWEAR_LOGIN_USER_KEY";
// const { REACT_APP_ENVIRONMENT, REACT_APP_API_BASE_URL_PROD, REACT_APP_API_BASE_URL_DEV } = process.env;
var baseURL ;
baseURL='http://127.0.0.1:8000/' 

// if (REACT_APP_ENVIRONMENT === "PRODUCTION") {
// 	baseURL = REACT_APP_API_BASE_URL_PROD;
// } else {
// 	baseURL = REACT_APP_API_BASE_URL_DEV;
// }

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
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




// RESPONSE INTERCEPTOR
// api.interceptors.response.use(
// 	(response) => response.data,
// 	(error) => {
// 		console.error("API ERROR:", error.response?.data || error.message);

// 		if (error.response && error.response.status === 401) {
// 			console.warn("Unauthorized! Redirecting to login...");
// 			localStorage.removeItem(LOGIN_USER_KEY);
// 		}

// 		return Promise.reject(error);
// 	}
// );

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log("error.response", error);
    if (error.response.status === 401) {
      localStorage.removeItem(LOGIN_USER_KEY);
    }

    return Promise.reject(error);
  }
);

export default class API {
	// AUTH
	// signUp = (body) => {
	// 	return api.post("/users/signup/", body);
	// };

	// signIn = (body) => {
	// 	return api.post("/users/signin/", body);
	// };

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

	// CATEGORY
	getCategories = () => {
		return api.get("/categories/");
	};

	// PRODUCT
	getProducts = (params = {}) => {
		return api.get("/products/", { params });
	};

	// CART
	getCarts = (params = {}) => {
		return api.get("/carts/", { params });
	};

	addCart = (body) => {
		return api.post("/carts/", body);
	};

	updateCart = (body, cartId) => {
		return api.put(`/carts/${cartId}/`, body);
	};

	deleteCart = (cartId) => {
		return api.delete(`/carts/${cartId}/`);
	};
}

