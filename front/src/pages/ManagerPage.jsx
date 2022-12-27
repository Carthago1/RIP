import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axiosInstance from '../api';
import { AddItem } from '../components/AddItem';
import { ManagerItemCard } from '../components/ManagerItemCard';
import { ManagerOrderCard } from '../components/ManagerOrderCard';
import { setOrders } from '../store/reducers/orderReducer';
import { setCategories, setProducts } from '../store/reducers/productReducer';

export const ManagerPage = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((store) => store.product);
    const { orders } = useSelector((store) => store.order);
    const [type, setType] = useState('');
    const [orderType, setOrderType] = useState('all');
    useEffect(() => {
        const fetchProducts = async () => {
            await axiosInstance.get('items-depth').then((response) => dispatch(setProducts(response?.data)));
        };
        const fetchCategories = async () => {
            await axiosInstance.get('categories').then((response) => dispatch(setCategories(response?.data)));
        };
        const fetchOrders = async () => {
            await axiosInstance.get('orders-depth').then((response) => dispatch(setOrders(response?.data)));
        };
        type === 'Товары'
            ? fetchProducts() && fetchCategories()
            : type === 'Заказы'
            ? fetchOrders()
            : fetchCategories();
    }, [dispatch, type]);
    return (
        <div className='p-8 flex flex-col gap-4'>
            <div className='flex gap-1'>
                <Link to='/'>Главная</Link> <p>/</p>
                <Link to='#'>Панель менеджера</Link>
            </div>
            <div className='flex gap-4'>
                <button
                    className={`py-1 px-2 rounded-md border ${type === 'Товары' && 'bg-gray-400 text-white'}`}
                    onClick={() => setType('Товары')}
                >
                    Товары
                </button>
                <button
                    className={`py-1 px-2 rounded-md border ${type === 'Заказы' && 'bg-gray-400 text-white'}`}
                    onClick={() => setType('Заказы')}
                >
                    Заказы
                </button>
                <button
                    className={`py-1 px-2 rounded-md border ${type === 'newItem' && 'bg-gray-400 text-white'}`}
                    onClick={() => setType('newItem')}
                >
                    Добавить товар
                </button>
            </div>
            <div>
                {type === 'Товары' ? (
                    products?.length > 0 &&
                    products.map((product) => <ManagerItemCard key={product.id_item} {...product} />)
                ) : type === 'Заказы' ? (
                    orders.length > 0 && (
                        <div>
                            <div className='flex gap-2 mb-4'>
                                <button
                                    className={`py-1 px-2 rounded-md border ${
                                        orderType === 'all' && 'bg-gray-400 text-white'
                                    }`}
                                    onClick={() => setOrderType('all')}
                                >
                                    Все
                                </button>
                                <button
                                    className={`py-1 px-2 rounded-md border ${
                                        orderType === 'Оформлен' && 'bg-gray-400 text-white'
                                    }`}
                                    onClick={() => setOrderType('Оформлен')}
                                >
                                    Оформлен
                                </button>
                                <button
                                    className={`py-1 px-2 rounded-md border ${
                                        orderType === 'В доставке' && 'bg-gray-400 text-white'
                                    }`}
                                    onClick={() => setOrderType('В доставке')}
                                >
                                    В доставке
                                </button>
                                <button
                                    className={`py-1 px-2 rounded-md border ${
                                        orderType === 'Доставлен' && 'bg-gray-400 text-white'
                                    }`}
                                    onClick={() => setOrderType('Доставлен')}
                                >
                                    Доставлен
                                </button>
                            </div>
                            {orders.map((order) =>
                                orderType === 'all' ? (
                                    <ManagerOrderCard key={order.id} {...order} />
                                ) : (
                                    orderType === order.status && <ManagerOrderCard key={order.id} {...order} />
                                )
                            )}
                        </div>
                    )
                ) : type === 'newItem' ? (
                    <AddItem resetType={() => setType('')} />
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};
