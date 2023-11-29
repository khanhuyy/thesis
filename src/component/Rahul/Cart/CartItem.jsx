import { Box, CloseButton, Image, Select, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCartProduct, getCartProducts, updateCartProductQty } from "../../../redux/CartReducer/action";
import { useToast } from '@chakra-ui/react';
import {collection, onSnapshot, query, where, getDoc, doc } from "firebase/firestore";
import db from "../../../service/firestore"
import axios from "axios";
import { baseUrl } from "../../../Url";


const CartItem = ({ Price, brand ,discount, price,sizes, image, quantity  ,firstName  ,gender  ,images  ,lastName  ,offerType ,title  ,userID  ,id}) => {
  const [ display, setDisplay ] = useState(true)
  const [qty, setQty] = useState(quantity)
  const [flag, setFlag] = useState(false)
  const [cartItemInfo, setCartItemInfo] = useState()
  
  const dispatch = useDispatch();
  const toast = useToast();
  const statuses = ["success", "error", "warning", "info"];
  const positions = ["top"];
  // const size = sizes?.[0]
  const size = "XL"
  const ogPrice = Math.ceil((price * 100)/discount)

  const img2 = image;

  const fetchCurrentCartItem = () => {
    axios.get(`${baseUrl}/cartItems/${id}`).
    then((doc) => {
      setCartItemInfo(doc.data)
    }).catch((err) => {
      console.log(err);
    })
  }
  useEffect(() => {
    fetchCurrentCartItem()
  }, [])

  const deleteCartItem = () => {
    axios.delete(`${baseUrl}/cartItems/${id}`)
  }

  const handleQty = (e) => {

    const qty = e.target.value;
    setQty(qty)

  dispatch(updateCartProductQty(id,+qty,Price ,ogPrice))
  .then(()=>{dispatch(getCartProducts)})

  }

  const handleDelete = () => {
    deleteCartItem()
    setDisplay(false)
    toast({
      title: "Product Deleted",
      position: positions,
      status: statuses[0],
      isClosable: true,
    });

    
  }

  const [cartItems, setCartItems] = useState();

  return (
    display && <Stack spacing={'0'} display={'flex'} flexDirection={'rows'} justifyContent={'center'} gap={'2px'} alignContent={'center'} overflow={'hidden'}  minH={'200px'} >
      <Image 
     
        w={"150px"}
       
        // h={'50px'}
        bgColor={'white'}
        src={image?image: img2}
        alt="img"
      />
      <Stack  w={'100%'} direction={'row'}  bgColor={'white'} justify={'space-between'}  p={'0 15px'}>

      <Stack p={'10px 0'} >
        <Text fontSize={'18px'} >{title}</Text>
        <Text as={'sub'}  fontSize={'14px'}>By {brand} Adidas</Text> 
        <br />
        <Text>
          Size :{" "}
          <Text as={"span"} fontSize={"16px"}>
            {size}
          </Text>{" "}
        </Text>   
        <Stack  align={"baseline"}  direction={"row"}>
          <Text    minW={"max-content"} >
            Quantity : 
          </Text>
          <Select  variant="flushed" value={qty} onChange={ handleQty } textAlign={'center'} maxW={"max-content"}   >
            <option value= {1}>1</option>
            <option value= {2}>2</option>
            <option value= {3}>3</option>
          </Select>
        </Stack>
      </Stack>
      
      <Stack p={'10px 0'}>
        <Box align={'right'}>

      <CloseButton onClick={handleDelete} size='md'  />
        </Box>
        <Stack direction={'row'} align={'baseline'} >
        <Text fontSize={'20px'}>  {price * qty}đ </Text>
        {(ogPrice) ?
          (
            <>
              <p  className="cutPrice" fontSize={'15px'} > {ogPrice * qty}đ </p>
              <p  className="cutPrice" fontSize={'15px'} > {ogPrice * qty * 85 /100}đ </p>
            </>
          ) : (
            <p  className="cutPrice" fontSize={'15px'} > {price * qty * 115/100} đ</p>
          )
        }
        </Stack>
        <Text as={'sub'} textAlign={'right'} fontSize={'14px'} >Free shipping</Text>
      </Stack>
      </Stack>
    </Stack>
  );
};

export default CartItem;
