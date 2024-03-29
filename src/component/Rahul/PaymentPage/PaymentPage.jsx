import { Button, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect } from "react";
import AddressForm from "./AddressForm";
import CartItems from "./CartItems";
import DebitCard from "./DebitCard";
import { useDispatch, useSelector } from "react-redux";
import Navbar2 from "../Navbar2";
import { getCartProducts } from "../../../redux/CartReducer/action";
import { useNavigate } from "react-router-dom";
import Nav from "../../Nav";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tabView] = useMediaQuery("(max-width: 1105px)");

  useEffect(() => {
    dispatch(getCartProducts);
  }, []);

  const { bag } = useSelector((store) => {
    // console.log('store', store);
    return store.CartReducer;
  });
  
  const cart = JSON.parse(localStorage.getItem('cart'))
  const cartItems = JSON.parse(localStorage.getItem('cartItems'))
  return (
    <Stack
      spacing={"0"}
      h={"100%"}
      overflow={"hidden"}
      // bgColor={"red"}
      // border={"1px solid red"}
    >
      <Nav />
      <Stack bgColor={"#eeeeee"} w={"100vw"} 
      // p={"3rem 8rem 0"} 
      pl={{ base: "0.3rem", sm: "0.3rem", md: "0.3rem", lg: "8rem" }}
      pr={{ base: "0.3rem", sm: "0.3rem", md: "0.3rem", lg: "8rem" }}
      
      direction={{ base: "column", sm: "column", md: "column", lg: "row" } }>
        <Stack
         p={"15px"} 
        // w={"50%"} 
        w={{ base: "100%", sm: "100%", md: "100%", lg: "50%" }} 
        h={"90vh"}
         overflowY={"scroll"}>
          <Text mt={"20px"} fontSize={"19px"}>
            Please Fill Address For Shipping
          </Text>

          <AddressForm />
          <Text mt={"20px"} fontSize={"19px"}>
            Cart Items ({cartItems.length})
          </Text>
          <Stack>
            {cartItems?.map((e, i) => (
              <CartItems key={i} {...e} />
            ))}
          </Stack>
          <Button
            onClick={() => navigate("/carts")}
            bgColor={"white"}
            borderRadius={"0"}
            m={0}
            p={"10px"}
          >
            EDIT CART
          </Button>
        </Stack>

        <Stack
          p={"2rem 0"}
          pl={ { base: "0.3rem", sm: "0.3rem", md: "0.3rem", lg: "2rem" }}
          pr={ { base: "0.3rem", sm: "0.3rem", md: "0.3rem", lg: "2rem" }}
          w={{ base: "100%", sm: "100%", md: "100%", lg: "60%" }}
          bgColor={"white"}
          // h={"90vh"}
          h={{ base: "500px", sm: "500px", md: "500px", lg: "90vh" }}
          position={"sticky"}
          top={"10%"}
          // left={"50%"}
          left={{ base: "0.3rem", sm: "0.3rem", md: "0.3rem", lg: "50%" }}
        >
          <Text mt={"20px"} fontSize={"19px"}>
            {" "}
            Payment Mode
          </Text>
          <DebitCard 
            cart={cart}
            cartItems={cartItems}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PaymentPage;
