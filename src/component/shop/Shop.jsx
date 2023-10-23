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
  return (<Box mt={"0px"}>

    <Box>
      <Nav setHamburger={setHamburger} hamburger={hamburger} />
        
      <Footer />
    </Box>
  </Box>
  )
}

export default Shop
