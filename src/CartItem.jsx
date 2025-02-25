import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
   const parseItemCostToInt = (itemCost) => {
        /* itens Cost have currency symbol that needs to be removed
        in order to calculate.*/
        return parseInt(itemCost.replace('$', ''), 10);
    };

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalAmount = 0;
        cart.forEach((item) => {
            const itemCost = parseItemCostToInt(item.cost);
            totalAmount += itemCost * item.quantity;
        });
        return totalAmount;
  };

  const handleContinueShopping = (e) => {
   onContinueShopping(e)
  };



  const handleIncrement = (item) => {
    const itemUpdated = { ...item };
        itemUpdated.quantity++;
        dispatch(updateQuantity(itemUpdated));
  };

  const handleDecrement = (item) => {
   const itemUpdated = { ...item };
// if the item quantity is 1, we are calling the remove method through dispatch
        if (itemUpdated.quantity == 1) {      
            dispatch(removeItem(itemUpdated));
        } else {
            itemUpdated.quantity--;
            dispatch(updateQuantity(itemUpdated));
        }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    let itemTotalCost = 0;
    const itemCost = parseItemCostToInt(item.cost);
        itemTotalCost = item.quantity * itemCost;
        return itemTotalCost;
  };
  const handleCheckoutShopping = (e) => {
  alert('Functionality to be added in the future');
};

  return (
<div className="cart-container">
            <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">{item.cost}</div>
                            <div className="cart-item-quantity">
                                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                                <span className="cart-item-quantity-value">{item.quantity}</span>
                                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
            <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
            <br />
            <button className="get-started-button" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
        </div>
    );
};

export default CartItem;


