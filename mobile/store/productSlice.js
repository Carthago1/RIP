import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    product: {},
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, { payload }) => {
            state.products = payload;
        },
        setProduct: (state, { payload }) => {
            state.product = payload;
        },
        resetProduct: (state) => {
            state.product = {};
        },
    },
});

export const productReducer = productSlice.reducer;

export const { setProducts, setProduct, resetProduct } = productSlice.actions;
