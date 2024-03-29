import React, { useState } from 'react'
import {
  Heading, Text, Box, HStack, Flex, Button, Image, Input, List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Container,
  Select
} from '@chakra-ui/react'
import { FaStar } from 'react-icons/fa';
import { CiDeliveryTruck } from 'react-icons/ci';
import { AiOutlineMobile } from 'react-icons/ai';
import { TbTruckReturn } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const SingleProductSecond = ({ id, addToCart, removeFromCart, title, brand, rating, count, price, discount, size, ageGroup, exist }) => {
  const navigate = useNavigate();
  const [ deliveryOption, setDeliveryOption ] = useState("Fast - Grab")

  return (
    <Box>
      
      {/* <Heading Heading as='h3' size='lg' noOfLines={1}>{brand}</Heading> */}
      <Text as={"b"} fontSize='25px'>{brand}</Text>
      <br />
      <Button style={{right: "0"}} onClick={()=>navigate(`/products/${id}/update`)}>Update</Button>

      <Text fontWeight={"500"} fontSize='20px'>{title}</Text>
      <Box mt={"2%"} mb={"2%"} style={{display: "inline-block"}}>
        <HStack
          spacing={"0.2rem"}
          p="0.15rem 0.5rem"
          width={"max-content"}
          bgColor={"white"}
          boxShadow={"0 0 3px rgba(0,0,0,0.4)"}
        >
          <Text fontWeight={"500"} fontSize={"1rem"} /* as="b" */>
            {rating}
          </Text>
          <FaStar size={"12"} color="teal" />
          <Text fontWeight={"500"} fontSize={"1rem"}>
            {"|"}
          </Text>
          <Text fontWeight={"500"} fontSize={"1rem"}>
            {count} Ratings
          </Text>
        </HStack>
      </Box>

      {/* <hr /> */}
      <Box>
        <Text fontSize={"18px"} as={"b"}>
          {price}{" "}
          <span style={{ fontSize: "18px", color: "orange" }}>
            {" "}
            &nbsp; {discount}
          </span>
        </Text>
      </Box>
      <Text color={"green"} fontWeight={"600"} fontSize={"15px"} mt={"1%"}>inclusive of all taxes</Text>
      <Text fontWeight={"600"} fontSize={"22px"}>Select Size</Text>
      <Box mt={"2%"}>
        {size?.map((el) => {
          return <button key={el} style={{ border: "1px solid black", margin: "1%", hight: "15px", borderRadius: "5px", padding: "5px" }}>&nbsp;&nbsp;  {el} &nbsp;&nbsp;</button>
        })}
      </Box>

      <Box mt={"5%"} mb={"5%"} display={"flex"} flexDirection={["column","row"]}>
            {exist === true ? (
              <Button color={"white"} background={"grey"}  pl={"20"}  pr={"20"} pt={"7"} pb={"7"} onClick={()=>{removeFromCart()}} >
                Remove from Cart
              </Button>
            ) : (
              <Button color={"white"} background={"pink.500"}  pl={"20"}  pr={"20"} pt={"7"} pb={"7"} onClick={()=>addToCart()} >
                Add to Cart
              </Button>
            )}
        <Button background={"white"} pl={"20"} pr={"20"} pt={"7"} pb={"7"} border={"1px solid black"}>Wishlist</Button>
      </Box>
      {/* <hr /> */}

      <Text fontWeight={"600"} fontSize={["1.1rem","1.7rem","1.2rem"]} mt={"2%"} mb={"2%"}>Delivery Option</Text>
      <Select  variant="flushed" value={deliveryOption} onChange={(e) => setDeliveryOption(e.target.value)} textAlign={'left'} maxW={"70%"}   >
        <option key={"Fast - Grab"} value="Fast - Grab">Fast - Grab</option>
        <option key={"Economic - Viettel Post"} value="Economic - Viettel Post">Economic - Viettel Post</option>
        <option key={"Luxury - J&T"} value="Luxury - J&T">Luxury - J&T</option>
      </Select>

      <Box display={"flex"} alignItems={"center"} mt={"4%"}>
        <CiDeliveryTruck size={"25px"} />
        <Text fontWeight={"600"} fontSize={["1.1rem","1.7rem","1.2rem"]} ml={"2%"} > Get it by Sat, Apr 08 </Text>
      </Box>

      <Box display={"flex"} alignItems={"center"} mt={"2%"}>
        <AiOutlineMobile size={"25px"} />
        <Text fontWeight={"600"} fontSize={["1.1rem","1.7rem","1.2rem"]} ml={"2%"} > Pay on delivery available </Text>
      </Box>

      <Box display={"flex"} alignItems={"center"} mt={"2%"}>
        <TbTruckReturn size={"25px"} />
        <Text fontWeight={"600"} fontSize={["1.1rem","1.7rem","1.2rem"]} ml={"2%"} >Easy 14 days return & exchange available </Text>
      </Box>

      <Text fontWeight={"400"} fontSize={["1.1rem","1.7rem","1.2rem"]} mt={"2%"} mb={"2%"}>100% Original Products</Text>
      <Flex>
        <Text fontWeight={"600"} fontSize={["1.1rem","1.7rem","1.2rem"]} mt={"2%"} mb={"2%"}>Price From: </Text>
        <Text fontWeight={"600"} fontSize={["1.1rem","1.7rem","1.2rem"]} mt={"2%"} mb={"2%"}>Commission: </Text>
        <Text fontWeight={"600"} fontSize={["1.1rem","1.7rem","1.2rem"]} mt={"2%"} mb={"2%"} color={"orange"}>{price}</Text>
      </Flex>
      <Box>
        <UnorderedList>
          <ListItem>Applicable on: Orders above Rs. 1999</ListItem>
          <ListItem>Coupon code: FESTIVE300</ListItem>
          <ListItem>Coupon Discount: Rs. 81 off (check cart for final savings)</ListItem>
          
        </UnorderedList>
      </Box>
      <Text fontWeight={"600"} fontSize={["1.1rem","1.7rem","1.2rem"]} mt={"2%"} mb={"2%"} color={"pink.500"}>View Eligible Products</Text>
      <Text fontWeight={"650"} fontSize={["1.1rem","1.7rem","1.2rem"]} mt={"2%"} mb={"2%"} color={"black"}>EMI options available</Text>

      <Box>
      <UnorderedList>
          <ListItem>EMI starting from Rs.26/month</ListItem>
          </UnorderedList>
      </Box>
      <Text fontWeight={"600"} fontSize={["1.1rem","1.7rem","1.2rem"]} mt={"2%"} mb={"2%"} color={"pink.500"}>View plans</Text>
      <Text fontWeight={"650"} fontSize={["1.1rem","1.7rem","1.2rem"]} mt={"2%"} mb={"1%"} color={"black"}>Product Details</Text>
      <Text fontWeight={"500"} fontSize={["1.1rem","1.7rem","1.2rem"]} mt={"1%"} mb={"2%"} color={"black"}>{title}</Text>


      {/* <hr style={{marginTop:"5%"}}/> */}







    </Box>
  )
}





export default SingleProductSecond
