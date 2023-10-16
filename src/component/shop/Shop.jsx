import React, { useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { auth } from 'firebase/auth';
import { Stack, Box, Text, HStack, Button } from "@chakra-ui/react";
import Nav from "../Nav";
import Footer from '../footer/Footer';

const Shop = () => {
  const [hamburger, setHamburger] = useState(false)
  return (<Box mt={"0px"}>

    <Box>
      <Nav setHamburger={setHamburger} hamburger={hamburger} />
      
      <Footer />
    </Box>


  </Box>
  )
}

export default Shop
