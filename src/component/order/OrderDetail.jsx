import {
  Box,
  Button, 
  ButtonGroup, 
  Container, 
  Image,
  Link,
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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../Url";
import Nav from "../Nav";
import "./OrderDetail.css";


const OrderDetail = () => {
  const {orderId} = useParams()
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const [orders, setOrders] = useState();
  const [order, setOrder] = useState();
  const [orderEvents, setOrderEvents] = useState();
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

  // get order
  const fetchOrder = () => {
    axios.get(`${baseUrl}/orders/${orderId}`)
      .then((doc) => {
        setOrder(doc.data);
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    fetchOrder()
  }, [])
  
  // get order events
  const fetchOrderEvents = () => {
    axios.get(`${baseUrl}/orderEvents?orderId=${orderId}`)
      .then((doc) => {
        setOrderEvents(doc.data);
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    fetchOrderEvents()
  }, [])
  console.log(orderEvents);
  
  // get order items
  const fetchOrderItems = () => {
    axios.get(`${baseUrl}/orderItems?orderID=${orderId}`)
      .then((doc) => {
        setOrderItems(doc.data);
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    fetchOrderItems()
  }, [])
  
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
      <Box bg='light-gray'>
        <Container bg='#EEEEEE' maxW='60%'>
          <div className="order-container" style={{margin: "10px"}}>
            <div className="info">
              <Image borderRadius='full'
                boxSize='150px' 
                src={user.avatar} /> <Text color='black'>Products</Text>
              <div>
                <Link onClick={()=>navigate(`/profiles`)}>Info</Link>
              </div>
              <div>
                <Link onClick={()=>navigate(`/profiles`)}>Deals</Link>
              </div>
              <div>
                <Link onClick={()=>navigate(`/users/${user.id}`)}>My account</Link>
              </div>
              <div>
                <Link onClick={()=>navigate(`/orders`)}>Orders</Link>
              </div>
              <div>
                <Link onClick={()=>navigate(`/vouchers`)}>Vouchers</Link>
              </div>
              <div>
                <Link onClick={()=>navigate(`/profiles`)}>Coins</Link>
              </div>
            </div>
            <div className="order-info">
              <div style={{display: "inline-flex"}}>
                <Button onClick={()=>navigate(`/orders`)}>- Back</Button>
                <div className="align-right">
                  <p style={{textAlign: "right"}}>Order Code: 202311261123CODE | Order Status: COMPLETE</p>
                </div>
              </div>
              <div style={{height: "250px", margin: "10px"}}>
                <div>Status Bar</div>
                {orderEvents?.length &&
                  (<div style={{display: "inline-flex", backgroundColor: "#E0E0E0", maxWidth: "100%"}}>
                    {orderEvents?.map((e)=> (
                      <div key={e.id} style={{display: "inline"}}>
                        <Image key={e.id} 
                          w={"20%"}
                          src="" alt="order status" />
                        <p>{e?.event}</p>
                        <p>{e?.createdAt}</p>
                      </div>
                    ))}
                  </div>)
                }
                <div style={{display: "inline-flex", margin: "10px"}}>
                  <Image 
                    w={"650px"}
                    bgColor={'white'}
                    src="https://as2.ftcdn.net/v2/jpg/04/46/57/47/1000_F_446574776_xRzD9h70n0032LUXJLfUgoQUWccd5Lqg.jpg"
                    alt="order status bar"
                  />
                </div>
                
              </div>
              <div style={{margin: "10px"}}>
                {orderItems?.length && (
                  
                  <Stack
                    w={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }} marginTop={"1px"}
                    paddingRight={{ base: "0", sm: "0", md: "0", lg: "1px" }}
                    paddingBottom={{ base: "1rem", sm: "1rem", md: "1rem", lg: "3rem" }}
                    overflowY={{ base: "auto", sm: "auto", md: "auto", lg: "scroll" }}
                    bg='#E0E0E0'
                  >
                    
                    {orderItems?.map((e) => (
                      // Pop up detail
                      <Stack key={e.id} 
                        spacing={'1px'} display={'flex'} flexDirection={'rows'} justifyContent={'center'} gap={'2px'} alignContent={'center'} overflow={'hidden'}  minH={'150px'} >
                        <hr />
                      
                      <Image 
                        w={"150px"}
                        bgColor={'white'}
                        src={e.image}
                        alt="img"
                      />
                      <Stack  w={'100%'} direction={'row'}  bgColor={'white'} justify={'space-between'}  p={'0 15px'}>
                
                      <Stack p={'10px 0'} >
                        {/* <Text fontSize={'18px'} >{title}</Text> */}
                        <Text fontSize={'18px'} >Order Item {e.id}</Text>
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
                        <Text fontSize={'20px'}>  {e.price * e.quantity * 85 / 100}đ </Text>
                        <p  className="cutPrice" fontSize={'15px'} > {e.price * e.quantity}đ </p>
                        </Stack>
                          <Text as={'sub'} textAlign={'right'} fontSize={'14px'} >Some Info</Text>
                        </Stack>
                        </Stack>
                        <hr />
                      </Stack>
                    ))}
                    
                  </Stack>
                )

                }
              </div>
            </div>
          </div>
          
        </Container>
      </Box>
    </Stack>
  );
};

export default OrderDetail;
