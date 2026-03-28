const initialState = { 
    user: {
        errors: {
            email: null, 
            password: null,
            password_confirm: null,
            error: null,
        },
    },

    categories: {
        results: [],
    },

    carts: {
        results: [],
        totalPrice: 0,
        totalCart: 0,
        totalCartItems: 0,
    },

    orders: {
        result: [],
        errors: {
            customer_name: null,
            customer_phone: null,
            address: null,
            pin_code: null,
            building_type: null,
            city: null,
            state: null,
        },
    },

    products: {
        result: [],
    },
};

export default initialState;