import { Button, Container, Text, Heading, HStack, Input, Stack, VStack, Image, Badge } from '@chakra-ui/react'
import { React, useEffect, useLayoutEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllCourses } from '../../Redux/actions/course'
import { addToPlaylist } from '../../Redux/actions/profile'
import { loadUser } from '../../Redux/actions/user'
import { fetch_Bookdata } from '../../Redux/actions/bookSlice'


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





const Course = ({ loading, title, imageSrc, id, author, is_available, description, publish_date, number_of_copies, category }) => {

    const dispatch = useDispatch();
    useEffect(() => {
        console.log("inside useEffect")
        dispatch(fetch_Bookdata());
    }, [])
    return (

        // <VStack className='Course' alignItems={['center', 'flex-start']}>
        //     <Image src={imageSrc} boxSize={'60'} objectFit={'contain'} />
        //     <Heading
        //         fontFamily={'sans-serif'}
        //         noOfLines='3'
        //         maxW={'200px'}
        //         size={'sm'}
        //         textAlign={['center', 'left']}
        //     >
        //         {title}
        //     </Heading>
        //     <Heading
        //         fontFamily={'sans-serif'}
        //         noOfLines='3'
        //         maxW={'200px'}
        //         size={'sm'}
        //         textAlign={['center', 'left']}
        //     >
        //         {number_of_copies}
        //     </Heading>
        //     <Text noOfLines='2'>{description}</Text>
        //     <HStack>
        //         <Text fontWeight={'bold'} textTransform='uppercase'>
        //             Created By :
        //         </Text>
        //         <Text fontFamily={'fantasy'} textTransform='uppercase'>
        //             {author}
        //         </Text>
        //     </HStack>
        //     <Stack alignItems={'center'} direction={['column', 'row']}>
        //         <Link to={`/courses/${id}`}>
        //             <Button colorScheme={'yellow'}>Buy Now</Button>
        //         </Link>
        //     </Stack>
        //     <Badge
        //         colorScheme={is_available ? 'green' : 'red'}
        //         variant='dot'
        //         mt={2}
        //         fontSize='0.8em'
        //     >
        //         {is_available ? 'Available' : 'Not Available'}
        //     </Badge>
        // </VStack>
        <VStack className='Course' alignItems={['center', 'flex-start']}>
            <Image src={imageSrc} boxSize={'60'} objectFit={'contain'} />
            <Heading
                fontFamily={'sans-serif'}
                noOfLines='3'
                maxW={'200px'}
                size={'sm'}
                textAlign={['center', 'left']}
            >
                {title}
            </Heading>
            {is_available ? (
                <Badge colorScheme='green'>Available</Badge>
            ) : (
                <Badge colorScheme='red'>Not Available</Badge>
            )}
            {is_available && (
                <Text noOfLines='2' color='green'>
                    Number of Copies: {number_of_copies}
                </Text>
            )}
            <Text noOfLines='2'>{description}</Text>
            <HStack>
                <Text fontWeight={'bold'} textTransform='uppercase'>
                    Created By :
                </Text>
                <Text fontFamily={'fantasy'} textTransform='uppercase'>
                    {author}
                </Text>
            </HStack>
            <Stack alignItems={'center'} direction={['column', 'row']}>
                <Link to={`/courses/${id}`}>
                    <Button colorScheme={'yellow'}>Explore Now</Button>
                </Link>
            </Stack>
        </VStack>

    )
}
const Courses = () => {

    const [keyword, setKeyword] = useState('')
    const [category, setCategory] = useState('All')
    const dispatch = useDispatch();
    const addToPlaylistHandler = async couseId => {
        await dispatch(addToPlaylist(couseId));
        dispatch(loadUser());
    };

    // const catergories = ['Web Development', 'Data Science', 'Machine Learning', 'Artificial Intelligence', 'Cyber Security', 'Cloud Computing', 'Ethical Hacking', 'Programming Languages', 'Mobile Development', 'Game Development', 'Software Testing', 'Digital Marketing', 'Graphic Design', 'Business', 'Office Productivity', 'Personal Development', 'Design', 'Marketing', 'Lifestyle', 'Photography', 'Health & Fitness', 'Music', 'Teaching & Academics']
    const catergories = ['All',
        'Fiction',
        'Non-Fiction',
        'Mystery',
        'Science',
        'Fantasy',
        'Romance',
        'Thriller',
        'Horror',
        'Biography',
        'Self-Help',
        'Cooking',
        'History',
        'Science',
        'Travel',
        'Poetry',
        'Children',
        'Young Adult',
        'Art',
        'Business',
        'Technology',
        'Health',
        'Religion',
        'Philosophy',
        'Education'
    ];

    const { loading, courses, error, message } = useSelector(
        state => state.course
    );
    useEffect(() => {
        dispatch(getAllCourses(category, keyword));

        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }

        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }, [category, keyword, dispatch, error, message]);
    return (
        <Container minH={"95vh"} maxW={"container.lg"} paddingY={'8'} >
            <Heading children="All Courses" m={'8'} />
            <Input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder={"Search a Course..."} type='text' focusBorderColor='green.300' />
            <HStack overflowX={"auto"} paddingY={"6"}>
                {catergories.map((item, index) => (
                    <Button onClick={() => { setCategory(item) }} key={index} minW={'60'}>
                        <Text children={item}></Text>
                    </Button>
                ))}
            </HStack>
            {/* <Stack direction={['column', 'row']} m={10} flexWrap="wrap" justifyContent={['flex-start', 'space-evenly']} alignItems={['center', 'flex-start']}>
                {data.length > 0 ? (

                    data.filter(item => {
                        // Check if the item's title or description contains the keyword
                        return (
                            item.title.toLowerCase().includes(keyword.toLowerCase()) ||
                            item.description.toLowerCase().includes(keyword.toLowerCase()) || item.author.toLowerCase().includes(keyword.toLowerCase()) || item.category.includes(keyword.toLowerCase()) || item.publish_date.toLowerCase().includes(keyword.toLowerCase())
                        );
                    }).map(item => {
                        if (item.category.includes(category) || !category) {
                            return (
                                <Course
                                    id={item.id}
                                    title={item.title}
                                    description={item.description}
                                    imageSrc={item.imageSrc}
                                    author={item.author}
                                    loading={loading}
                                    is_available={item.is_available}
                                    number_of_copies={item.number_of_copies}
                                    category={item.category}
                                />
                            );
                        }
                        return null; // If the category doesn't match or no category is selected, skip rendering
                    })
                ) : (
                    <Heading mt="4" children="Courses Not Found" />
                )}



            </Stack> */}
            <Stack direction={['column', 'row']} m={10} flexWrap="wrap" justifyContent={['flex-start', 'space-evenly']} alignItems={['center', 'flex-start']}>
                {data.length > 0 ? (
                    data.filter(item => {
                        // Check if the item's title or description contains the keyword
                        return (
                            item.title.toLowerCase().includes(keyword.toLowerCase()) ||
                            item.description.toLowerCase().includes(keyword.toLowerCase()) ||
                            item.author.toLowerCase().includes(keyword.toLowerCase()) ||
                            item.category.includes(keyword.toLowerCase()) ||
                            item.publish_date.toLowerCase().includes(keyword.toLowerCase())
                        );
                    }).map(item => {
                        if (category === 'All' || item.category.includes(category)) {
                            return (
                                <Course
                                    id={item.id}
                                    title={item.title}
                                    description={item.description}
                                    imageSrc={item.imageSrc}
                                    author={item.author}
                                    loading={loading}
                                    is_available={item.is_available}
                                    number_of_copies={item.number_of_copies}
                                    category={item.category}
                                />
                            );
                        }
                        return null; // If the category doesn't match or no category is selected, skip rendering
                    })
                ) : (
                    <Heading mt="4" children="Courses Not Found" />
                )}
            </Stack>

        </Container>
    )
}

export default Courses
