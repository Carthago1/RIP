import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { axiosInstance } from '../api';
import { setCategory, setProduct } from '../store/reducers/productReducer';

export const ProductPage = () => {
    const dispatch = useDispatch();
    const { product, category } = useSelector((store) => store.product);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            await axiosInstance.get(`/items/${id}`).then((response) => dispatch(setProduct(response?.data)));
        };
        const fetchCategory = async () => {
            await axiosInstance
                .get(`/categories/${product.category_id}`)
                .then((response) => dispatch(setCategory(response?.data)));
        };
        fetchProduct();
        !category.name && product.category_id && fetchCategory();
    }, [category.name, dispatch, id, product.category_id]);
    return (
        <div className='m-8'>
            <div className='flex gap-1'>
                <Link to='/'>{category.title ? category.title : 'Главная'}</Link> <p>/</p>
                <Link to='#'>{product.name}</Link>
            </div>
            {!!product && (
                <div className='p-8 rounded-xl bg-gray-300 min-w-[400px] max-w-[50vh] flex flex-col justify-center items-start cursor-pointer mt-8'>
                    <img src={product.photo} alt={product.name} />
                    <p>
                        <strong>Название:</strong> {product.name}
                    </p>
                    <p>
                        <strong>Производитель:</strong> {product.manufacturer}
                    </p>
                    <p>
                        <strong>Описание:</strong> {product.description}
                    </p>
                    <p>
                        <strong>Стоимость:</strong> {product.price}
                    </p>
                </div>
            )}
        </div>
    );
};
