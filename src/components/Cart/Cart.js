import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import CartItem from './CartItem';
import { loadUser } from '../../Redux/actions/user';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { cancelFromCart } from '../../Redux/actions/cartSlice';

function Cart() {
  let cartItems = useSelector(state => state.cartReducer.cartItems);
  console.log(cartItems);
  const current_user = useSelector(state => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleBuy = () => {
    onOpen();
  };
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const handlePlaceOrderClick = () => {
    setIsBillModalOpen(true);
  };
  return (
    <>
      <div
        className="cartContainer"
        style={{
          height: 'calc(100vh - 100px)',
          overflowY: 'auto',
          scrollbarWidth: 'thin' /* Firefox */,
        }}
      >
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          colorScheme={current_user ? 'green' : 'red'}
          mt={4}
          mr={5}
          mb={2}
          size="lg"
          onClick={() => {
            if (current_user) {
              //do here
              handleBuy();
            } else {
              // Redirect to /login for non-logged-in users
              navigate('/login');
            }
          }}
        >
          {current_user ? 'Buy' : 'Login'}
        </Button>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cart Items and Bill</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {cartItems.map((item, index) => (
              <div key={index}>
                <h3>{item.title}</h3>
                <p>Author: {item.author}</p>
                <p>Category: {item.category.join(', ')}</p>
                <p>Description: {item.description}</p>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Subtotal: ${(item.quantity * item.price).toFixed(2)}</p>
                <p>Is Available: {item.is_available ? 'Yes' : 'No'}</p>
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  style={{ maxWidth: '100px' }}
                />
                <hr />
              </div>
            ))}
            {/* <p>Total Price:3 ${totalPrice.toFixed(2)}</p> */}
            <p>
              Total Price: $
              {cartItems
                .reduce((total, item) => total + item.quantity * item.price, 0)
                .toFixed(2)}
            </p>
          </ModalBody>
          <ModalFooter justifyContent="space-between">
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                handlePlaceOrderClick();
                onClose();

                // dispatch(cancelFromCart(cartItems.item));
              }}
            >
              Place Order
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isBillModalOpen} onClose={() => setIsBillModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Summary</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              {' '}
              Total Price: $
              {cartItems
                .reduce((total, item) => total + item.quantity * item.price, 0)
                .toFixed(2)}
            </p>
            <p>Thanks for your order!</p>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => {
                setIsBillModalOpen(false);
                for (const itemId in cartItems) {
                  if (cartItems.hasOwnProperty(itemId)) {
                    // Dispatch the cancelFromCart action for each item
                    dispatch(cancelFromCart(cartItems[itemId]));
                  }
                }
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Cart;
