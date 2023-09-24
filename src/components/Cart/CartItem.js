import React from 'react';
// import ClearIcon from '@mui/icons-material/Clear';
import { CloseIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  cancelFromCart,
} from '../../Redux/actions/cartSlice';
import './Cart.css';
import { loadUser } from '../../Redux/actions/user';
import { Button, useToast } from '@chakra-ui/react';
function CartItem(props) {
  console.log(props);
  const toast = useToast();
  const dispatch = useDispatch();
  // dispatch(loadUser());
  const handleAddToCart = () => {
    if (props.quantity < props.number_of_copies) {
      dispatch(addToCart(props.item));
      // const newQuantity = props.quantity + 1;
      // dispatch(addToCart({ ...props.item, quantity: newQuantity }));
    } else {
      toast({
        title: 'Limit Reached',
        description: 'You have reached the maximum quantity allowed.',
        status: 'warning',
        duration: 1000,
        isClosable: true,
      });
    }
  };
  return (
    <>
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
              handleAddToCart();
              // dispatch(addToCart(props.item));
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
            <CloseIcon />
          </button>
        </div>
      </div>
    </>
  );
}

export default CartItem;
