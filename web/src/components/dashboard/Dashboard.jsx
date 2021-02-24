import React, { useState } from "react";
import Main from './cart/Main';
import Basket from './cart/Basket';
import data from './data';
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import { useGlobalState, useGlobalStateUpdate } from '../../context/globalContext'
function Dashboard() {
    const globalState = useGlobalState()
    const setGlobalState = useGlobalStateUpdate()
    const { products } = data;
    const [cartItems, setCartItems] = useState([]);
    const onAdd = (product) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist) {
            setCartItems(
                cartItems.map((x) =>
                    x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
                )
            );
        } else {
            setCartItems([...cartItems, { ...product, qty: 1 }]);
        }
    };
    const onRemove = (product) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist.qty === 1) {
            setCartItems(cartItems.filter((x) => x.id !== product.id));
        } else {
            setCartItems(
                cartItems.map((x) =>
                    x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
                )
            );
        }
    };
    function logout() {
        axios({
            method: 'post',
            url: 'http://localhost:5000/logout',
        }).then((response) => {
            console.log(response)
            // location.href = "./login.html"
        }, (error) => {
            console.log(error);
        });
        return false
    }
    return (
        <div>
            <Navbar logout={logout}/>
            <div className='bg-primary py-2'>
                <div className="container">
                    <h2 className="mr-4 text-white">Welcome {globalState.user.name}</h2>
                </div>
            </div>
            <div className="row1">
                <Main products={products} onAdd={onAdd}></Main>
                <Basket
                    cartItems={cartItems}
                    onAdd={onAdd}
                    onRemove={onRemove}
                ></Basket>
            </div>
        </div>
    )
}

export default Dashboard