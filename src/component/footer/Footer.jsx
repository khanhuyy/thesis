import { Box, Grid, Image, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import logo from "../../images/StyleHub.png";
import Footercont from './Footercont';

const Footer = () => {
  return (
    <Box p={"2% 4%"} mt={"1%"} color={"black"} bgColor={'#eeeeee'}>
        <Box w={["50%","40%","20%"]} m={"3% 0%"}>
            <Image src={logo} w={["40%","40%%","40%"]}/>
        </Box>
        <SimpleGrid columns={[2,2,6]} gap={"1%"} pb={"6%"}>
            <Box w={"100%"}><Footercont arr={["About Us", "Conatct Us", "Refer & Earn","Loyalti Program", "Brand Directory","Careers"]} title={"Myntra"}/></Box>
            <Box w={"100%"}><Footercont arr={["Men", "Women", "Kids","Home & Living", "Beauty","Gritzo","Gift Cards","Myntra Insider"]} title={"ONLINE SHOPPING"}/></Box>
            <Box w={"100%"}><Footercont arr={["Blog", "Careers", "Site Map","Corporate Information", "Whitehat","CUSTOMER POLICIES"]} title={"Usefull links"}/></Box>
            <Box w={"100%"}><Footercont arr={["My Account", "Track Your Order", "Store Locator","FAQs","Sell On Myntra"]} title={"Quick Links"}/></Box>
            <Box w={"100%"}><Footercont arr={["0124-4616444", "Buildings Alyssa,Begonia and Clover situated in Embassy Tech Village,Outer Ring Road,Devarabeesanahalli Village,Varthur Hobli,Bengaluru – 560103, India"]} title={"Myntra.com"}/></Box>
            {/* <Box w={"100%"}><Image src={formImage} borderRadius={"10px"} /></Box> */}
        </SimpleGrid>
        <hr/>  
        <SimpleGrid columns={[2,2]} gap={"10"} pb={"2%"}>
            <Text fontSize={["0.7rem","0.8rem","0.8rem"]}>Copyright © 2023, Myntra.com, or its affiliates</Text>
            <Text fontSize={["0.7rem","0.8rem","0.8rem"]}>Terms & Conditions | Delivery Policy | Privacy Policy | Disclaimer | Returns Policy</Text>
        </SimpleGrid>    
    </Box>
  )
}

export default Footer
