import React from 'react'
import { Container, VStack, Heading, Stack, Avatar, Text, Box, HStack, Grid, Flex, Image, Badge } from '@chakra-ui/react'
import { Link } from "react-router-dom"
import { RiCheckboxCircleFill, RiErrorWarningFill } from 'react-icons/ri'
import intro from "../../assets/videos/intro.mp4"
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    addToCart,
    removeFromCart,
    cancelFromCart,
} from '../../Redux/actions/cartSlice';

import {
    useToast,
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

const data = [
    {
        id: '1',
        title: 'The Art of Programming',
        category: ['Non-Fiction', 'Science', 'Technology'],
        description: 'A comprehensive guide to programming.',
        imageSrc:
            'https://static.vecteezy.com/system/resources/previews/009/384/332/original/old-vintage-book-clipart-design-illustration-free-png.png',
        number_of_copies: 10,
        author: 'John Smith',
        publish_date: '2023-09-22',
        loading: false,
        is_available: true,
        price: 19.99,
    },
    {
        id: '2',
        title: 'Exploring the Universe',
        category: ['Non-Fiction', 'Science', 'Astronomy'],
        description: 'A journey through the mysteries of the cosmos.',
        imageSrc:
            'https://static.vecteezy.com/system/resources/previews/009/384/332/original/old-vintage-book-clipart-design-illustration-free-png.png',
        number_of_copies: 5,
        author: 'Jane Doe',
        publish_date: '2023-09-23',
        loading: true,
        is_available: false,
        price: 24.99,
    },
    {
        id: '3',
        title: 'The Quest for Adventure',
        category: ['Fantasy', 'Adventure', 'Fiction'],
        description: 'Join the protagonist on an epic adventure.',
        imageSrc:
            'https://static.vecteezy.com/system/resources/previews/009/384/332/original/old-vintage-book-clipart-design-illustration-free-png.png',
        number_of_copies: 15,
        author: 'David Johnson',
        publish_date: '2023-09-24',
        loading: false,
        is_available: true,
        price: 29.99,
    },
    {
        id: '4',
        title: 'Love and Betrayal',
        category: ['Romance', 'Drama'],
        description: 'A tale of love, passion, and betrayal.',
        imageSrc:
            'https://static.vecteezy.com/system/resources/previews/009/384/332/original/old-vintage-book-clipart-design-illustration-free-png.png',
        number_of_copies: 8,
        author: 'Emily Davis',
        publish_date: '2023-09-25',
        loading: true,
        is_available: true,
        price: 14.99,
    },
    {
        id: '5',
        title: 'The Life of a Genius',
        category: ['Biography', 'History'],
        description: 'A biography of a remarkable historical figure.',
        imageSrc:
            'https://static.vecteezy.com/system/resources/previews/009/384/332/original/old-vintage-book-clipart-design-illustration-free-png.png',
        number_of_copies: 12,
        author: 'Michael Brown',
        publish_date: '2021-09-26',
        loading: false,
        is_available: false,
        price: 22.99,
    },
    {
        id: '6',
        title: 'The Mystery of the Lost City',
        category: ['Mystery', 'Adventure'],
        description: 'An exciting adventure to uncover a lost city.',
        imageSrc:
            'https://static.vecteezy.com/system/resources/previews/009/384/332/original/old-vintage-book-clipart-design-illustration-free-png.png',
        number_of_copies: 20,
        author: 'Sarah White',
        publish_date: '2023-09-27',
        loading: false,
        is_available: true,
        price: 18.99,
    },
    {
        id: '7',
        title: 'Cooking Mastery',
        category: ['Cooking', 'Culinary'],
        description: 'Master the art of cooking with this comprehensive guide.',
        imageSrc:
            'https://static.vecteezy.com/system/resources/previews/009/384/332/original/old-vintage-book-clipart-design-illustration-free-png.png',
        number_of_copies: 25,
        author: 'Alice Smith',
        publish_date: '2023-09-28',
        loading: false,
        is_available: true,
        price: 16.99,
    },
    {
        id: '8',
        title: 'History of Ancient Civilizations',
        category: ['History', 'Archaeology'],
        description: 'Explore the fascinating history of ancient civilizations.',
        imageSrc:
            'https://static.vecteezy.com/system/resources/previews/009/384/332/original/old-vintage-book-clipart-design-illustration-free-png.png',
        number_of_copies: 30,
        author: 'Robert Johnson',
        publish_date: '2023-09-29',
        loading: true,
        is_available: false,
        price: 23.99,
    },
    {
        id: '9',
        title: 'The Great Outdoors',
        category: ['Travel', 'Adventure'],
        description: 'Discover the beauty of nature with this outdoor adventure guide.',
        imageSrc:
            'https://static.vecteezy.com/system/resources/previews/009/384/332/original/old-vintage-book-clipart-design-illustration-free-png.png',
        number_of_copies: 18,
        author: 'Emma Davis',
        publish_date: '2023-09-30',
        loading: false,
        is_available: true,
        price: 19.99,
    },
    {
        id: '10',
        title: 'The World of Art',
        category: ['Art', 'Creativity'],
        description: 'Explore the world of art and unleash your creativity.',
        imageSrc:
            'https://static.vecteezy.com/system/resources/previews/009/384/332/original/old-vintage-book-clipart-design-illustration-free-png.png',
        number_of_copies: 12,
        author: 'Oliver Smith',
        publish_date: '2023-10-01',
        loading: false,
        is_available: true,
        price: 21.99,
    },
];


const CoursePage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const [isBillModalOpen, setIsBillModalOpen] = useState(false);
    const handleBuy = () => {
        onOpen();
    };
    const toast = useToast();
    const url = window.location.pathname; // Replace with the actual URL
    const dispatch = useDispatch();
    const bookId = parseInt(url.split('/').pop(), 10);
    const current_user = useSelector(state => state.user.isAuthenticated);
    const boxShadowStyle = {
        boxShadow: ' rgba(0, 0, 0, 0.4) 0px 30px 90px',
    };
    const book = data.find(item => item.id == bookId);
    const handlePlaceOrderClick = () => {
        setIsBillModalOpen(true);
    };
    const [bookNumber, setbookNumber] = useState(0);
    const books = [
        {
            _id: "ssdfds",
            title: "book : Introduction to React",
            description: "sample secfdf ndsfsdfdsf",
            video: {
                url: "https://www.youtube.com/watch?v=Ke90Tje7VS0"
            }
        },
        {
            _id: "ssdfds2",
            title: "book : Introduction to React-2",
            description: "sample secfdf ndsfsdfdsf",
            video: {
                url: "https://www.youtube.com/watch?v=Ke90Tje7VS0"
            }
        },
        {
            _id: "ssdfds3",
            title: "book : Introduction to React-3",
            description: "sample secfdf ndsfsdfdsf",
            video: {
                url: "https://www.youtube.com/watch?v=Ke90Tje7VS0"
            }
        }
    ]


    return (
        <>
            {/* <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            /> */}
            <Box height="700px">

                <Flex >
                    {/* Left Side */}
                    <Box flex="1" p="4" mt={"40"} >
                        <Box style={boxShadowStyle} width={'350px'} height={420} p={9} ml={40}  >
                            <Image src={book.imageSrc} boxSize={'200px'} objectFit={'contain'} mx="auto" />
                            <Text textAlign="center" fontSize="lg" fontWeight="bold">
                                {book.number_of_copies} Copies
                            </Text>
                            <Text textAlign="center" fontSize="md">
                                Author: {book.author}
                            </Text>
                            <Text textAlign="center" fontSize="md">
                                Publish Date: {book.publish_date}
                            </Text>
                            <HStack spacing={2} justify="center" mt={4}>
                                {book.category.map((cat, index) => (
                                    <Badge key={index} colorScheme="blue">
                                        {cat}
                                    </Badge>
                                ))}
                            </HStack>

                        </Box>
                    </Box>

                    {/* Right Side */}
                    <Box flex="1" p="4" mt={"40"} textAlign="center">
                        <Heading size="lg">{book.title}</Heading>
                        {book.is_available && (
                            <Button colorScheme={current_user ? 'green' : 'red'} mt={4} mr={5} mb={2} size="lg" onClick={() => {
                                if (current_user) {
                                    //do here
                                    handleBuy();
                                } else {
                                    // Redirect to /login for non-logged-in users
                                    navigate('/login');
                                }
                            }}>
                                Buy
                            </Button>
                        )}
                        {book.is_available ? (
                            <Button
                                colorScheme="blue"
                                mt={2}
                                size="lg"
                                onClick={(e) => {
                                    e.preventDefault();

                                    dispatch(addToCart(book));

                                    // Display a success toast
                                    toast({
                                        title: "Item added to cart",
                                        description: "You have successfully added the item to your cart.",
                                        status: "success",
                                        duration: 1000, // Optional: Set the duration for how long the toast should be displayed
                                        isClosable: true, // Optional: Allow users to close the toast manually
                                    });
                                }}
                            >
                                Add to Cart
                            </Button>

                        ) : (
                            <Text mt={2} color="red">
                                Not Available
                            </Text>
                        )}
                    </Box>
                </Flex></Box>
            {/* <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cart Items and Bill</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div key={book}>
                            <h3>{book.title}</h3>
                            <p>Author: {book.author}</p>
                            <p>Category: {book.category.join(', ')}</p>
                            <p>Description: {book.description}</p>
                            <p>Price: ${book.price.toFixed(2)}</p>
                            <p>Is Available: {book.is_available ? 'Yes' : 'No'}</p>
                            <img
                                src={book.imageSrc}
                                alt={book.title}
                                style={{ maxWidth: '100px' }}
                            />
                            <hr />
                        </div>
                        <p>
                            Total Price: $
                            ${book.price.toFixed(2)}
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal> */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cart Items and Bill</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div key={book}>
                            <h3>{book.title}</h3>
                            <p>Author: {book.author}</p>
                            <p>Category: {book.category.join(', ')}</p>
                            <p>Description: {book.description}</p>
                            <p>Price: ${book.price.toFixed(2)}</p>
                            <p>Is Available: {book.is_available ? 'Yes' : 'No'}</p>
                            <img
                                src={book.imageSrc}
                                alt={book.title}
                                style={{ maxWidth: '100px' }}
                            />
                            <hr />
                        </div>
                        <p>
                            Total Price: $
                            ${book.price.toFixed(2)}
                        </p>
                    </ModalBody>
                    <ModalFooter justifyContent="space-between">
                        <Button colorScheme="blue" onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="green" onClick={() => {
                            handlePlaceOrderClick();
                            onClose();

                        }}>
                            Place Order
                        </Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>

            {/* Bill Modal */}
            <Modal isOpen={isBillModalOpen} onClose={() => setIsBillModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Order Summary</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>Total Price: ${book.price.toFixed(2)}</p>
                        <p>Thanks for your order!</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={() => setIsBillModalOpen(false)}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CoursePage
