import { Container, VStack, Heading, FormLabel, Input, Box, Button } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { login } from '../../../Redux/actions/user'
import { GoogleLogin } from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";
import ConnectWalletButton from "./ConnectWalletButton";
import { useNavigate } from 'react-router-dom';
// import { useRouter } from "next/router";
import Web3 from "web3";
const Login = () => {
    // const router = useRouter();
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState("");
    const dispatch = useDispatch();

    const submitHandler = e => {
        e.preventDefault();
        dispatch(login(email, password));
    };
    const onPressConnect = async () => {
        setLoading(true);

        try {
            if (window?.ethereum?.isMetaMask) {
                // Desktop browser
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });

                const account = Web3.utils.toChecksumAddress(accounts[0]);
                // setAddress(account);

                if (account) {
                    localStorage.setItem("email", "enter your email");
                    localStorage.setItem("metamaskaddress", account);
                    console.log("insigde normal")
                    toast.success("you are successfully logged in!------meta", {
                        position: "bottom-left",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    navigate('/courses');
                    const formbody = { metamask: account };

                    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formbody),
                    });
                    let responce = await res.json();
                    console.log(responce);
                    localStorage.setItem("token", responce.token);
                    localStorage.setItem("email", responce.email);
                    navigate('/home');
                } else {
                    toast.warn("Invaild Crendential!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    };

    const onPressLogout = () => setAddress("");
    const responseMessage = (response) => {
        if (response.clientId) {
            localStorage.setItem("email", "enter your email");
            localStorage.setItem("clientId", response.clientId);
            toast.success("you are successfully logged in--pranjal!", {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setTimeout(() => {
                navigate('/home'); // Navigate to the "/profile" route
            }, 2000);
        } else {
            toast.warn("Invaild Crendential!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };
    return <Container height={"95vh"}>
        {/* <ToastContainer
            position="bottom-left"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        /> */}
        <VStack height={"full"} justifyContent="center" spacing={"16"}>
            <Heading children="Welcome To LearnUp" />
            <form onSubmit={submitHandler} style={{ width: "100%" }}>
                <Box my="4" >
                    <FormLabel htmlFor='email' children="Email Address" />
                    <Input required id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="xyz@gmail.com" type={"email"} focusBorderColor="green.500" />
                </Box>
                <Box my="4" >
                    <FormLabel htmlFor='password' children="Password" />
                    <Input required id="password" autoComplete="on" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" type={"password"} focusBorderColor="green.500" />
                </Box>
                <Box >
                    <Link to="/forgetpassword"> <Button fontSize={"sm"} variant="link">Forget Password?</Button></Link>
                </Box>
                <Button my="4" type='submit' colorScheme={"green"}>Login</Button>
                <Button my="4" as="button"
                    type='submit' colorScheme={"green"} // Set the background color to blue
                    // Set the text color to white
                    width="150px"
                    height="40px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="15px"
                    fontWeight="bold"
                    cursor="pointer">
                    <ConnectWalletButton
                        onPressConnect={onPressConnect}
                        onPressLogout={onPressLogout}
                        loading={loading}
                        address={address}
                    />
                </Button>
                <Button my="4" type='submit' ><GoogleLogin
                    onSuccess={responseMessage}
                    onError={errorMessage}
                /></Button>

                <Box my="4">
                    New User ?{" "}
                    <Link to="/signup">
                        <Button colorScheme={"green.500"} variant="link">
                            Sign Up
                        </Button>
                    </Link>{" "} Here
                </Box>
            </form>

        </VStack>
    </Container >
}

export default Login
