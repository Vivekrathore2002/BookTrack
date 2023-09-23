import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  cancelFromCart,
} from '../../Redux/actions/cartSlice';
import './Cart.css';

function CartItem(props) {
  const dispatch = useDispatch();
  // title, imageSrc, id, author, is_available, description, publish_date, number_of_copies, category
  return (
    <div className="cartItem">
      <div className="leftImage">
        <img src={props.imageSrc} alt={props.title} />
      </div>
      <div className="middleInfo">
        <h3>{props.title}</h3>
        <h4>{props.category}</h4>
        <p>$ {props.price}</p>
        <p>Publisher : {props.publish_date}</p>
      </div>
      <div className="showQuantity">
        <button
          onClick={e => {
            e.preventDefault();
            dispatch(addToCart(props.item));
          }}
        >
          +
        </button>
        <div>{props.quantity}</div>
        <button
          onClick={e => {
            e.preventDefault();
            dispatch(removeFromCart(props.item));
          }}
        >
          -
        </button>
      </div>
      <div className="removeFromCart">
        <button
          onClick={e => {
            e.preventDefault();
            dispatch(cancelFromCart(props.item));
          }}
        >
          <ClearIcon />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
