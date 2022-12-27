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
            if (!!payload?.id) {
                console.log('1', !!payload?.id);
                state.products = payload.products.filter((product) => +product.category.id_category === +payload.id);
            } else if (!payload.products) {
                console.log('2', !payload.products);
                state.products = payload;
            } else {
                console.log('3', payload.products);
                state.products = payload.products;
            }
        },
        setProduct: (state, { payload }) => {
            state.product = payload;
        },
        resetCategory: (state) => {
            state.category = {};
        },
    },
});

export const productReducer = productSlice.reducer;

export const { setCategory, setCategories, setProduct, setProducts, resetCategory } = productSlice.actions;
