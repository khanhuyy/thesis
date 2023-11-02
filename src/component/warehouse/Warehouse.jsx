import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  SimpleGrid,
  Center,
  Stack,
  Box,
  Button,
  Image,
  Text,
  Container
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
import "../../CSS/Warehouse.css";

const Warehouse = () => {
  const [hamburger, setHamburger] = useState(false)
  const navigate = useNavigate();
  const [products, setProducts] = useState();
  const [warehouse, setWarehouse] = useState();

  const vendor = JSON.parse(localStorage.getItem('user'))

  const fetchWarehouse = () => {
    axios.get(`${baseUrl}/warehouses?ownerID=${vendor.id}`)
      .then((doc) => {
        setWarehouse(doc.data[0]);
        
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    fetchWarehouse()
  }, [])


  const fetchData = () => {
    // axios.get(`${baseUrl}/products?warehouseID=${warehouse?.id}`)
    axios.get(`${baseUrl}/products?warehouseID=2`)
      .then((doc) => {
        setProducts(doc.data);
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    fetchData()
  }, [])  

  return (<Box mt={"0px"}>

    <Box >
      <Box>
        <Nav setHamburger={setHamburger} hamburger={hamburger} />
        {/* <Box bg='#F0F8FF' w='100%' p={4} color='white' >  */}
        <Container bg='#F0F8FF' maxW='80%'>
          <div className="warehouse">
            <div>
              <Image borderRadius='full'
                boxSize='150px' 
                src={vendor.avatar} /> <Text color='black'>Products</Text>
            </div>
            <div>
              <Text color='black'>Followers</Text>
              <Text color='black'>Followings</Text>
              <Text color='black'>Rates: 4.8</Text>
            </div>
          </div>
          
          
        {/* </Box> */}
          <Container bg='#00aeff' maxW='80%'>
            <Text size='2xl' as='b'>Description</Text>
            <Box>{vendor.description}</Box>
            <Box>{vendor.description}</Box>
            <Box>{vendor.description}</Box>
          </Container>
          <br/>
        </Container>

        <Container bg='#FFFFFF' maxW='80%'>
        <Stack p={"2.50rem"}>
          <Stack
            spacing={2}
            align="stretch"
            marginBottom="20px"
          >
            <Breadcrumb separator="-" className={"breadcrummb"}>
              <BreadcrumbItem>
                <BreadcrumbLink as={"b"} cursor="text" href="#">
                  My Warehouse
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink cursor="text">
                  {products?.length} products
                </BreadcrumbLink>
              </BreadcrumbItem>
              <Button onClick={() => navigate('/createProduct')}>Add new Product</Button>
            </Breadcrumb>
          </Stack>

          <Stack
            className="main-container"
            // border={"1px solid black"}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Stack
              className="right-side-menu"
              w="85rem"
              p={"20px 0"}
            >
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
                    {products?.length >= 0 &&
                      products?.map((e) =>
                          <Box key={e.id} onClick={()=>navigate(`/products/${e.id}`,{state:"men"})}>
                            < CardForMensAndWomen key={e.id} props={e} />
                          </Box>)}
                  </SimpleGrid>
                </Stack>
                <Center marginBottom="20px" >
                  {(products?.length >= 0) && 
                    <Pagination page={1} totalPage={Math.ceil(products?.length / 15)} />
                  }
                </Center>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        </Container>

        <Footer />
      </Box>
      
    </Box>
  </Box>
  )
}

export default Warehouse
