import { React } from 'react'
import { Heading, Stack, VStack, Text, Button, Image, Box, HStack } from "@chakra-ui/react"
import { Link } from 'react-router-dom';
import vg from "../../assets/images/bg.png"
import { CgGoogle, CgYoutube } from "react-icons/cg"
import { SiCoursera, SiUdemy } from "react-icons/si"
import { DiAws } from "react-icons/di"
import intro from "../../assets/videos/intro.mp4"
import "./new.css"
const Home = () => {
    return (
        <section className='Home' >
            <div className="container" >
                <Stack direction={['column', 'row']} height='100%' justifyContent={['center', 'space-between']} alignItems="center" spacing={['16', '56']}
                > {/* stack is div with display flex  direction id column if this is phone other wise row*/}
                    <VStack width={"100%"} alignItems={['center', 'flex-end']}> {/*Vstack is div with display flex direction is column*/}
                        <Heading children="BookTrack : Your Library Haven" size={"2xl"} />
                        <Text textAlign={['center', 'left']} children="Find Valueable Content At Reasonable Prize" />
                        <Link to="/courses">
                            <Button size={"lg"} colorScheme={"yellow"}>Explore Now</Button>
                        </Link>
                    </VStack>
                    <Image className='vector-graphics' boxSize={'md'} src={vg} objectFit="contain" />
                </Stack>


            </div>

            <Box bg="blackAlpha.800" padding={"8"}>
                <Heading textAlign={"center"} fontFamily="body" color="yellow.300" children="Our Publication" />
                <HStack className='brandsBanner' justifyContent={"space-evenly"} marginTop={"4"}>
                    <CgGoogle />
                    <CgYoutube />
                    <SiCoursera />
                    <SiUdemy />
                    <DiAws />
                </HStack>
            </Box>
            <Box className="container2">
                {/* <AspectRatio ratio={16 / 9}> */}
                <iframe height={500} width={800}
                    src={"https://www.youtube.com/embed/JsTPtujW4c0"}
                    title="YouTube Video"
                    allowFullScreen
                    frameBorder="0"
                ></iframe>
                {/* </AspectRatio> */}
            </Box>
        </section>
    )
}

export default Home
