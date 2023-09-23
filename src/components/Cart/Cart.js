import React from 'react';
import { useSelector } from 'react-redux';
import './Cart.css';
import CartItem from './CartItem';

function Cart() {
  const cartItems = useSelector(state => state.cartReducer.cartItems);

  return (
    <div className="cartContainer">
      <h4>MY CART</h4>
      {cartItems.map((item, index) => {
        return (
          <CartItem
            key={index}
            item={item}
            title={item.title}
            price={item.price}
            quantity={item.quantity}
            id={item.id}
            category={item.category}
            description={item.description}
            imageSrc={item.imageSrc}
            number_of_copies={item.number_of_copies}
            author={item.author}
            publish_date={item.publish_date}
            is_available={item.is_available}
          />
        );
      })}
    </div>
  );
}

export default Cart;
