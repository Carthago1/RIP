import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../api';
import { ProductCard } from '../components/ProductCard';
import { resetCategory, setCategories, setCategory, setProducts } from '../store/reducers/productReducer';

export const HomePage = () => {
    const { categories, category: selectedCategory, products } = useSelector((store) => store.product);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCategories = async () => {
            await axiosInstance.get('/categories').then((response) =>{
                dispatch(setCategories(response?.data))
            });
        };

        const fetchProducts = async (id) => {
            await axiosInstance.get('/items').then((response) => {
                dispatch(setProducts({ products: response?.data, id }))
            });
        };

        fetchCategories();
        fetchProducts(selectedCategory.id_category);
    }, [dispatch, selectedCategory]);

    const handleCategory = async (id) => {
        if (+selectedCategory.id_category === +id) {
            dispatch(resetCategory());
        } else {
            await axiosInstance.get(`/categories/${id}`).then((response) => {
                dispatch(setCategory(response?.data))
            });
            await axiosInstance.get('/items').then((response) => {
                dispatch(setProducts({ products: response?.data, id }))
            });
        }
    };

    return (
        <div className='m-8'>
            <div className='flex gap-1'>
                <Link to='#'>{selectedCategory.title ? selectedCategory.title : 'Главная'}</Link> <p>/</p>
            </div>
            <div className='flex gap-2 my-8'>
                {categories.map((category) => (
                    <button
                        key={category.id_category}
                        className={`py-4 px-8 border rounded-xl ${
                            category.title === selectedCategory.title && 'bg-gray-300'
                        }`}
                        onClick={() => handleCategory(category.id_category)}
                    >
                        {category.title}
                    </button>
                ))}
            </div>
            {products && (
                <div>
                    {products.map((product) => (
                        <ProductCard key={product.id_item} {...product} />
                    ))}
                </div>
            )}
        </div>
    );
};
