// import API from "../../API";
// import { fetchProductsAction } from "./actions";

// const api = new API();

// export const fetchProducts = (query = {}, onSuccess = () => {}) => {
//     return async (dispatch) => {
//         return api.getProducts(query).then((products) => {
//             dispatch(fetchProductsAction(products));
//             onSuccess();
//         });
//     };
// };
import api from "../../API"; 
import { fetchProductsAction } from "./actions"; 

export const fetchProducts = (query = {}, onSuccess = () => {}) => {
    return (dispatch) => {
        return api.getProducts(query)
            .then((products) => {
                dispatch(fetchProductsAction(products));
                onSuccess();
            })
            .catch((error) => {
                console.error("Fetch Products Error:", error);
            });
    };
};