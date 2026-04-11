// import { createSelector } from "reselect";

// const productsSelector = (state) => state.products;
// export const getProducts = createSelector([productsSelector], (state) => state);

const productsSelector = (state) => state.products;

export const getProducts = productsSelector;