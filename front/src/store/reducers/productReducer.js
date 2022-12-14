import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    category: {},
    products: [],
    product: {},
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setCategories: (state, { payload }) => {
            state.categories = payload;
        },
        setCategory: (state, { payload }) => {
            state.category = payload;
        },
        setProducts: (state, { payload }) => {
            if (!!payload.id) {
                state.products = payload.products.filter((product) => {
                    product.id_category === payload.id
                });
            } else {
                state.products = payload.products;
            }
        },
        setProduct: (state, { payload }) => {
            console.log('setProduct');
            state.product = payload;
        },
        resetCategory: (state) => {
            console.log('resetCategory');
            state.category = {};
        },
    },
});

export const productReducer = productSlice.reducer;

export const { setCategory, setCategories, setProduct, setProducts, resetCategory } = productSlice.actions;
