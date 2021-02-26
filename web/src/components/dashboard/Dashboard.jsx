import React, { useState } from "react";
import Basket from './cart/Basket';
import products from './data';
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import { useHistory } from "react-router-dom"
import { useGlobalState, useGlobalStateUpdate } from '../../context/globalContext'

function Dashboard() {
    const globalState = useGlobalState()
    const globalStateUpdate = useGlobalStateUpdate()
    let history = useHistory()
    const [hideCart,setHideCart] = useState(true)
    const [cartItems, setCartItems] = useState([]);
    
    ///////////////////////////////
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
    ///////////////////////////////
    ///////////////////////////////
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
    ///////////////////////////////

    function logout() {
        axios({
            method: 'post',
            url: 'http://localhost:5000/logout',
            withCredentials: true
        }).then((response) => {
            console.log(response)
            globalStateUpdate(prev => ({
                ...prev,
                loginStatus: false,
                role: null
            }))
            history.push("/login")
        }, (error) => {
            console.log(error);
        });
    }
    return (
        <div>
            <Navbar logout={logout} setCart={setHideCart} cartItemsLength={cartItems.length} />
            <div className='bg-primary py-2'>
                <div className="container">
                    <h2 className="mr-4 text-white">Welcome {globalState.user.name} </h2>
                </div>
            </div>
            <div className="row1">
            {hideCart ===true ?
                <main className="container">
                    <h1 className="text-center ">Products</h1>
                    <div className="row">
                        {products.map((product) => (
                            <div className="col-md-4" key={product.id}>
                                <div>
                                    <img className="w-100" height="200" src={product.image} alt={product.name} />
                                    <h3>{product.name}</h3>
                                    <div>{product.price}Pkr</div>
                                    <div>
                                        <button onClick={() => onAdd(product)} className="btn btn-primary">Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>:
                <>
                <Basket cartItems={cartItems} onAdd={onAdd} onRemove={onRemove}/></>}
            </div>
        </div>
    )
}

export default Dashboard