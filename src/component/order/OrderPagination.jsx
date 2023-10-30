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


const OrderPagination = () => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const [orders, setOrders] = useState();
  const [orderItems, setOrderItems] = useState();
  const user = JSON.parse(localStorage.getItem('user'))

  const fetchOrders = () => {
    axios.get(`${baseUrl}/orders?ownerID=${user.id}`)
      .then((doc) => {
        setOrders(doc.data);
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    fetchOrders()
  }, [])
  console.log(orders);
  
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

      {orders?.length && (
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
            {orders?.map((e) => (
              <Stack spacing={'0'} display={'flex'} flexDirection={'rows'} justifyContent={'center'} gap={'2px'} alignContent={'center'} overflow={'hidden'}  minH={'200px'} >
              <Image 
                w={"150px"}
                bgColor={'white'}
                src={e.avatar}
                alt="img"
              />
              <Stack  w={'100%'} direction={'row'}  bgColor={'white'} justify={'space-between'}  p={'0 15px'}>
        
              <Stack p={'10px 0'} >
                {/* <Text fontSize={'18px'} >{title}</Text> */}
                <Text fontSize={'18px'} >Title (todo add)</Text>
                <br />
                <Text>
                  Size :{" "}
                  <Text as={"span"} fontSize={"16px"}>
                    {14}
                  </Text>{" "}
                </Text>   
                <Stack  align={"baseline"}  direction={"row"}>
                  <Text    minW={"max-content"} >
                    Quantity:  {1}
                  </Text>
                </Stack>
              </Stack>
              
              <Stack p={'10px 0'}>
                <Stack direction={'row'} align={'baseline'} >
                <Text fontSize={'20px'}>  đ{1 * 1} </Text>
                <p  className="cutPrice" fontSize={'15px'} > đ{1 * 1} </p>
                </Stack>
                  <Text as={'sub'} textAlign={'right'} fontSize={'14px'} >Free shipping</Text>
                </Stack>
                </Stack>
              </Stack>
            ))}
            
          </Stack>
          
        </Stack>
      )}
    </Stack>
  );
};

export default OrderPagination;
