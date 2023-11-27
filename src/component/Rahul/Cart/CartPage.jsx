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
import CartItem from "./CartItem";
import CartEmpty from "./CartEmpty";
import { getCartProducts } from "../../../redux/CartReducer/action";
import Navbar2 from "../Navbar2";
import { useNavigate } from "react-router-dom";
import {collection, onSnapshot, query, where, getDoc, doc } from "firebase/firestore";
import db from "../../../service/firestore"
import axios from "axios";
import { baseUrl } from "../../../Url";
import Nav from "../../Nav";


const CartPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const [tabView] = useMediaQuery("(max-width: 990px)");
  const { bag,isLoading } = useSelector((store) => {
    return store.CartReducer;
  });

  const [cart, setCart] = useState({});
  const [cartItems, setCartItems] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const fetchCart = () => {
    axios.get(`${baseUrl}/carts?ownerId=${user?.id}&isComplete=false`)
      .then((doc) => {
        setCart(doc.data?.[0]);
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCartItems = () => {
    axios.get(`${baseUrl}/cartItems?cartID=${cart?.id}`)
      .then((doc) => {
        setCartItems(doc.data);
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    fetchCartItems()
  }, [])

  const rColor = "#d3145a";
  
  const createOrder = () => {
    axios.post(`${baseUrl}/orders`, {
      "ownerId": `${user?.id}`,
      "total": 700000, // todo 
      "paymentMethod": "CASH",
      "quantity": 3,
      "cartID": cart?.id || 123
    })
    .then((doc) => {
      
    })
    .catch((err) => console.log(err))
  }

  const createProduct = () => {
    axios.post(`${baseUrl}/products`, {
        "createdAt": TimeRanges.now(),
        "brandID": 37,
        "availableColors": [],
        "image": "https://loremflickr.com/640/480/fashion", // todo
        "price": "806",
        "sizes": [
            12,
            23,
            34
        ],
        "productFlag": 1,
        "warehouseID": 1,
        "id": "1"
    }).then((doc) => {
        // setCategories(doc.data);
    })
    .catch((err) => console.log(err));
}

  const handleClick = () => {
    if (cart?.paymentMethod === "CASH") {
      localStorage.setItem("totalPrice", cart?.total + 99);
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
      navigate("/paymentPage");
    } else {
      createOrder();
      // create debt order
    }
    
  };
  
  return (
    <Stack
      spacing={"0"}
      overflow={"hidden"}
    >
      <Nav />
      { localStorage.getItem('user') !== undefined && localStorage.getItem('user') !== null && (
        <>
        {cartItems?.length && (
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
              h={{ base: "70vh", sm: "70vh", md: "70vh", lg: "85vh" }}
              overflowY={{ base: "auto", sm: "auto", md: "auto", lg: "scroll" }}
            >
              {cartItems?.map((e, i) => (
                <CartItem key={i} {...e} />
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
                  <Text lineHeight={1}> {cart?.total}đ</Text>
                  <Text lineHeight={1} color={"#99cc33"}>
                    FREE
                  </Text>
                  <Text lineHeight={1}>+ 99đ</Text>
                  <Text
                    lineHeight={1}
                    fontSize={"20px"}
                    color={rColor}
                    fontWeight={450}
                  >
                    {cart?.total + 99} đ
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
                    <Text color={"#d3145a"}> {cart?.total}đ </Text>
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
        )}</>
      )}
      {/* {!cart?.cartItems?.length && <CartEmpty />} */}
      {!cartItems?.length && <CartEmpty />}
    </Stack>
  );
};

export default CartPage;
