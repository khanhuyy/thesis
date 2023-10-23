import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  SimpleGrid,
  Center,
  Stack,
  Box,
} from "@chakra-ui/react";
import {
  doc,
  getDoc,
} from 'firebase/firestore';
import React, { useRef, useState } from "react";

import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";

import Footer from '../footer/Footer'
import { useEffect } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CardForMensAndWomen from "../ProductPage/CardForMensAndWomen";
import Pagination from "../ProductPage/Pagination";
import Nav from "../Nav";
import db from "../../service/firestore";
import axios from "axios";
import { baseUrl } from "../../Url";

const Shop = () => {
  const [localShop, setLocalShop] = useState();
  const fetchData = () => {
    axios.get(`${baseUrl}/productShops?shopID=1`)
      .then((doc) => {
        console.log(doc);
        setLocalShop(doc);
      })
      .catch((err) => console.log(err))
    console.log(localShop);
  }


  useEffect(() => {
    fetchData()
  }, [])
  const navigate = useNavigate();
  const [hamburger, setHamburger] = useState(false)
  const [shop, setShop] = useState();
  const shopRef = doc(db, 'shops', '1');
  useEffect(() => {
    getDoc(shopRef)
        .then((doc) => {
            let data = doc.data();
            data.id = doc.id;
            setShop(data);
        })
  }, []);
  console.log(shop);
  return (<Box mt={"0px"}>

    <Box>
      <Nav setHamburger={setHamburger} hamburger={hamburger} />
        <Box>Avatar
          <Box>Info</Box>
          <Box>Info</Box>
          <Box>Info</Box>
        </Box>
        <Box>Products</Box>
        <Stack p={"1.50rem"}>
          <Stack
            spacing={2}
            align="stretch"
            // border={"1px solid black"}
            marginBottom="20px"
          >
            <Breadcrumb separator="-" className={"breadcrummb"}>
              <BreadcrumbItem>
                <BreadcrumbLink as={"b"} cursor="text" href="#">
                  Mens Wear Online Store
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink cursor="text">
                  {shop?.products?.length} items
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Stack>

          <Stack
            className="main-container"
            // border={"1px solid black"}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Stack
              // className="left-side-menu"
              // width={"14%"}
              // width={"15rem"}
            // minW={"15rem"}
            // minChildWidth="7.5rem"
            >
            </Stack>

            <Stack
              className="right-side-menu"

              w="85rem"
              p={"20px 0"}
            // minW={'75rem'}
            >
              {/* <Stack w={"20%"} textAlign="right" placeItems={'right'} placeContent='right' */}
              <Stack w="100%" p={"0 18px"} alignItems={"flex-end"}>
                <Stack
                  w={"16rem"}
                  //  border={"1px solid black"}
                  borderRadius={"12"}
                  boxShadow=" rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;"
                >
                </Stack>
              </Stack>

              <Stack className="product-display">
                <Stack borderLeft="1px solid  #e9e9ed" borderTop="1px solid  #e9e9ed" p={"15px 15px"}>
                  <SimpleGrid columns={[1, 1, 2, 3, 4, 5]} m="auto" gap="40px">
                    {shop?.products?.length >= 0 &&
                      shop?.products?.map((e) =>

                          <Box onClick={()=>navigate(`/products/${e.id}`,{state:"men"})}>
                            < CardForMensAndWomen key={e.id} props={e} />
                          </Box>)}
                  </SimpleGrid>
                </Stack>
                <Center marginBottom="20px" >

                  {/* <Pagination page={1} totalPage={Math.ceil(shop?.products?.length / 15)} /> */}
                </Center>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      <Footer />
    </Box>
  </Box>
  )
}

export default Shop
