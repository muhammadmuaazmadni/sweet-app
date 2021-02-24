import React from 'react';
import '../Dashboard.css'
export default function Basket(props) {
  const { cartItems, onAdd, onRemove } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  console.log(cartItems)
  console.log(itemsPrice)
  const totalPrice = itemsPrice;
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
              <button onClick={() => alert('Implement Checkout!')} className="btn btn-primary">
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