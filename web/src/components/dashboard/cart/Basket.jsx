import React from 'react';
import '../Dashboard.css'
import axios from 'axios'
export default function Basket(props) {
  const { cartItems, onAdd, onRemove } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  console.log(cartItems)
  console.log(itemsPrice)
  const totalPrice = itemsPrice;
    
  function placeOrder(){
    axios({
      method: 'post',
      url: "http://localhost:5000/order",
      data:{
        total: totalPrice,
        orders: cartItems
      },
      withCredentials: true
    }).then((response)=>{
      if (response.data.status === 200) {
        console.log(response.data.message)
        console.log(response.data.data)
      }
      else{
        console.log(response.data.message)
      }
    }).catch((err)=>{
      console.log(err)
    }) 
  }
  return (
    <aside className="container ">
      <div className="row justify-content-center">
        <div className='col-md-6 basket mt-5'>
      <h2>Cart Items</h2>
        {cartItems.length === 0 && <div>Cart is empty</div>}
        {cartItems.map((item) => (
          <div key={item.id} className="row">
            <div className="col-md-4">{item.name}</div>
            <div className="col-md-4 text-center">
              <button onClick={() => onRemove(item)} className="remove">
                -
              </button>
              <button onClick={() => onAdd(item)} className="add">
                +
              </button>
            </div>

            <div className="col-md-4 text-right">
              {item.qty} x {item.price}Pkr
            </div>
          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-6">
                <strong>Total Price</strong>
              </div>
              <div className="col-6 text-right">
                <strong>{totalPrice}Pkr</strong>
              </div>
            </div>
            <hr />
            <div className="row1">
              <button 
               className="btn btn-primary" onClick={placeOrder}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
      </div>
    </aside>
  );
}