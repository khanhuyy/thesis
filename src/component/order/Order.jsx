import {
  Button, 
  Image,
  Stack,
  Text,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import { getCartProducts } from "../../redux/CartReducer/action";
import Navbar2 from "../Rahul/Navbar2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../Url";
import Nav from "../Nav";


const Order = () => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const [tabView] = useMediaQuery("(max-width: 990px)");
  const { bag,isLoading } = useSelector((store) => {
    return store.CartReducer;
  });

  const [cart, setCart] = useState();
  const [orderItems, setOrderItems] = useState();
 
  useEffect(() => {
    dispatch(getCartProducts);
  }, [totalPrice,bag.length]);
  
  useEffect(() => {
    const initialValue = 0;
    const tP = bag.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * currentValue.quantity,
      initialValue
    );
    setTotalPrice(tP);
  }, [bag]);

  const fetchData = () => {
    axios.get(`${baseUrl}/orderItems?orderID=1`)
      .then((doc) => {
        setOrderItems(doc.data);
        console.log(doc.data);
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    fetchData()
  }, [])

  const rColor = "#d3145a";
  
  const handleClick = () => {
    localStorage.setItem("totalPrice", totalPrice + 99);
    console.log("navigate");
    navigate("/paymentPage");
  };
  

  return (
    <Stack
      spacing={"0"}
      overflow={"hidden"}
      // bgColor={"red"}
      // border={"1px solid red"}
    >
      <Nav />

      {orderItems?.length && (
        <Stack
          bgColor={"#eeeeee"}
          w={"100%"}
          mt={"240px"}
          p={"3rem 8rem 0"}
          pl={{ base: "0.3rem", sm: "0.3rem", md: "8rem", lg: "8rem" }}
          pr={{ base: "0.3rem", sm: "0.3rem", md: "8rem", lg: "8rem" }}
          pt={"10vh"}
          direction={{ base: "column", sm: "column", md: "column", lg: "row" }}
        >
          <Stack
            w={{ base: "100%", sm: "100%", md: "100%", lg: "70%" }}
            marginTop={"35px"}
            paddingRight={{ base: "0", sm: "0", md: "0", lg: "10px" }}
            paddingBottom={{ base: "1rem", sm: "1rem", md: "1rem", lg: "3rem" }}
            // h={"85vh"}
            h={{ base: "70vh", sm: "70vh", md: "70vh", lg: "85vh" }}
            overflowY={{ base: "auto", sm: "auto", md: "auto", lg: "scroll" }}
          >
            {orderItems?.map((e, i) => (
              <OrderItem key={i} {...e} />
            ))}
            
          </Stack>
          <Stack
            p={{ base: "0.3rem", sm: "0.3rem", md: "0.3rem", lg: "2rem" }}
            w={{ base: "100%", sm: "100%", md: "100%", lg: "48%" }}
            bgColor={"white"}
            h={{ base: "300px", sm: "300px", md: "300px", lg: "90vh" }}
            position={"sticky"}
            top={"8%"}
            left={"50%"}
            pb={"10vh"}
          >
            <Stack direction={"row"} justify={"space-between"}>
              <Stack direction={"row"} gap={"10px"}>
                <Image
                  boxSize="30px"
                  objectFit="cover"
                  src="https://img0.junaroad.com/images/icons/coupon_icon_v2.png"
                  alt="Dan Abramov"
                />
                <Stack>
                  <Text fontWeight={"bold"}>APPLY COUPON CODE</Text>
                  
                </Stack>
              </Stack>
              <Button
                variant={"solid"}
                _active={{ all: "none" }}
                _hover={{ boxShadow: "rgba(0, 0, 0, 0.25) 2.4px 2.4px 3.2px" }}
                color={"white"}
                bgColor={rColor}
                fontSize={"14px"}
              >
                + ADD
              </Button>
            </Stack>
            <Text fontSize={"20px"}>SUMMARY</Text>
            <Stack direction={"row"} justify={"space-between"}>
              <Stack>
                <Text lineHeight={1}>Total Price</Text>
                <Text lineHeight={1}>Shipping Charges</Text>
                <Text lineHeight={1}>Handling Charges</Text>
                <Text fontSize={"20px"} color={rColor} fontWeight={450}>
                  Amount Payable
                </Text>
              </Stack>
              <Stack textAlign={"right"}>
                <Text lineHeight={1}>₹ {totalPrice}</Text>
                <Text lineHeight={1} color={"#99cc33"}>
                  FREE
                </Text>
                <Text lineHeight={1}>+ ₹ 99</Text>
                <Text
                  lineHeight={1}
                  fontSize={"20px"}
                  color={rColor}
                  fontWeight={450}
                >
                  ₹ {totalPrice + 99}
                </Text>
              </Stack>
            </Stack>
            {!tabView && (
              <Button
            
                variant={"solid"}
                _active={{ all: "none" }}
                _hover={{ boxShadow: "rgba(0, 0, 0, 0.25) 2.4px 2.4px 3.2px" }}
                bgColor={rColor}
                color={"white"}
                fontSize={"24px"}
                style={{
                  padding: "26px 0",
                  fontWeight: "bold",
                  marginTop: "20px",
                }}
                onClick={handleClick}
              >
                BUY NOW
              </Button>
            )}
            {tabView && (
              <Stack 
             
                direction={"row"}
                position={"fixed"}
                bottom={0}
                left={0}
                w={"100vw"}
                align={"center"}
                bgColor={"white"}
                p={"0.7rem"}
              >
                <VStack>
                  <Text color={"#d3145a"}> ₹{totalPrice} </Text>
                  <Text as="sub" color={"grey"}>
                    SUMMARY
                  </Text>
                </VStack>
                <Button
                  variant={"solid"}
                  w={"100%"}
                  _active={{ all: "none" }}
                  _hover={{
                    boxShadow: "rgba(0, 0, 0, 0.25) 2.4px 2.4px 3.2px",
                  }}
                  bgColor={rColor}
                  color={"white"}
                  fontSize={"24px"}
                  style={{
                    padding: "26px 0",
                    fontWeight: "bold",
                    marginTop: "20px",
                  }}
                  onClick={handleClick}
                >
                  BUY NOW
                </Button>
              </Stack>
            )}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default Order;
