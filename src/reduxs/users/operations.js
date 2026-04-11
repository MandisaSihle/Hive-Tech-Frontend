// import API, { LOGIN_USER_KEY } from '../../API';
// import { signInAction, signInError, signUpAction, signUpError, signUserStoreAction } from './actions';

// const api = new API();

// export const fetchUserFromLocalStorage = () => {
//     return (dispatch) => {
//         const userJSON = localStorage.getItem(LOGIN_USER_KEY);
//         if (userJSON && userJSON.token !== "") {
//             dispatch(signUserStoreAction(JSON.parse(userJSON)));
//         }
//     };
// };

// export const signUp = (data = {}, onSuccess = null) => {
//     return async (dispatch) => {
//         return api
//             .signUp(data)
//             .then((response) => {
//                 localStorage.setItem(LOGIN_USER_KEY, JSON.stringify(response));
//                 dispatch(signUpAction(response));
//                 onSuccess();
//             })
//             .catch((error) => {
//                 dispatch(signUpError(error.response.data));
//             });
//     };
// };

// export const signIn = (data = {}, onSuccess = null) => {
//     return async (dispatch) => {
//         return api
//             .signIn(data)
//             .then((response) => {
//                 localStorage.setItem(LOGIN_USER_KEY, JSON.stringify(response));
//                 dispatch(signInAction(response));
//                 onSuccess();
//             })
//             .catch((error) => {
//                 dispatch(signInError(error.response.data));
//             });
//     };
// };

import api, { LOGIN_USER_KEY } from '../../API';
import { signInAction, signInError, signUpAction, signUpError, signUserStoreAction } from './actions';


export const fetchUserFromLocalStorage = () => {
    return (dispatch) => {
        const userJSON = localStorage.getItem(LOGIN_USER_KEY);
        if (userJSON) {
            const user = JSON.parse(userJSON);
            // Ensure token exists before dispatching
            if (user && (user.token || user.access)) {
                dispatch(signUserStoreAction(user));
            }
        }
    };
};

export const signUp = (data = {}, onSuccess = null) => {
    return (dispatch) => {
        return api
            .signUp(data)
            .then((response) => {
                localStorage.setItem(LOGIN_USER_KEY, JSON.stringify(response));
                dispatch(signUpAction(response));
                if (onSuccess) onSuccess();
            })
            .catch((error) => {
                const errorData = error.response?.data || { error: "Sign up failed" };
                dispatch(signUpError(errorData));
            });
    };
};

export const signIn = (data = {}, onSuccess = null) => {
    return (dispatch) => {
        return api
            .signIn(data)
            .then((response) => {
                localStorage.setItem(LOGIN_USER_KEY, JSON.stringify(response));
                dispatch(signInAction(response));
                if (onSuccess) onSuccess();
            })
            .catch((error) => {
                const errorData = error.response?.data || { error: "Sign in failed" };
                dispatch(signInError(errorData));
            });
    };
};