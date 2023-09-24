import React from 'react'
import { Button, Container, Text, Heading, HStack, Input, Stack, VStack, Image, Box } from '@chakra-ui/react'
import { TiSocialYoutubeCircular, TiSocialLinkedinCircular, TiSocialInstagramCircular } from "react-icons/ti"
import { DiGithub } from 'react-icons/di'
const Footer = () => {
    return <Box padding={'4'} bg='blackAlpha.700' minH='10vh'>
        <Stack direction={['column', 'row']}>
            <VStack alignItems={['center', 'flex-start']} width='full'>
                <Heading children="All Rights Reserved" color={"white"} />
                <Heading size="sm" fontFamily={"body"} color={"green.300"} children="@Vivek" />
            </VStack>
            <HStack spacing={['2', '10']} justifyContent={"center"} color="white" fontSize={"50"}>
                <a href='https://instagram.com/vivek_banna_?igshid=NTc4MTIwNjQ2YQ==' target={"_blank"} rel="noreferrer">
                    <TiSocialInstagramCircular />
                </a>
                <a href='https://www.youtube.com/channel/UCF0MydLieVlVKA9JEewfrNA' target={"_blank"} rel="noreferrer">
                    <TiSocialYoutubeCircular />
                </a>
                <a href='https://www.linkedin.com/in/vivekrathore0703/' target={"_blank"} rel="noreferrer">
                    <TiSocialLinkedinCircular />
                </a>
                <a href='https://github.com/Vivekrathore2002' rel="noreferrer" target={"_blank"}>
                    <DiGithub />
                </a>

            </HStack>
        </Stack>
    </Box>

}

export default Footer
