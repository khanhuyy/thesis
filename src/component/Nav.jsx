import React, { useEffect, useRef, useState } from "react";
import { 
  PhoneIcon, 
  AddIcon, 
  WarningIcon, 
  SearchIcon, EditIcon, RepeatIcon, 
  HamburgerIcon, ExternalLinkIcon
} from "@chakra-ui/icons";
import "../CSS/Nav.css";
import MobileNav from "./NavBar/MobileNav";
import { Link, useNavigate } from "react-router-dom";
import MobNav2 from "./NavBar/MobNav2";
import axios from "axios";
import { Box, Button, Flex, Image, 
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  IconButton
} from "@chakra-ui/react";
import { baseUrl } from "../Url";
import firebase from "../service/firebase";
import "firebase/compat/auth";
import {collection, onSnapshot, query, where, getDoc, doc } from "firebase/firestore";
import db from "../service/firestore";
import { formatURL } from "../utils/helper";

const Nav = ({ setHamburger, hamburger }) => {
  const navigate = useNavigate()

  let token = JSON.parse(localStorage.getItem("Login"))
  const [logout, setLogout] = useState()

  let Display
  let D2

  const [search, setSearch] = useState("")
  const [DATA, setData] = useState([])
  // const [categories, setCategories] = useState([])
  const [random, setRandom] = useState(true)
  const [categories, setCategories] = useState()

  const [windowDimension, detectHW] = useState({
    winWidth: window.innerWidth,
  });


  const fetchData = () => {
    let Data = search
    Data = Data.split(" ")

    axios.get(`${baseUrl}/${Data[0]}?q=${Data[1]}`).then((res) => setData(res.data))
      .catch((err) => console.log(err))
  }


  useEffect(() => {
    if (search != "") {
      fetchData()
    }
  }, [search])

  const handleNavigate1 = (id) => {
    let data = search
    data = data.split(" ")[0]
    navigate(`/products/${id}`, { state: data })

  }

  const handleSearch = () => {
    console.log("Searching...")
    axios.get(`${baseUrl}/products?name=${search}`)
  }
  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimension])

  const handleLogout = (e) => {
    window.localStorage.removeItem('user')
    navigate('/');
    setLogout(true)
  }

  const fetchCategories = () => {
    axios.get(`${baseUrl}/categories?_limit=6`).then((res) => setCategories(res.data))
      .catch((err) => console.log(err))
  }
  useEffect (() => {
    fetchCategories()
  }, [])

  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <div style={{ position: 'sticky', top: "0", backgroundColor: 'white', marginTop: "0px", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", zIndex: 100 }}>
      {windowDimension.winWidth > 1024 ? (
        <div className="NavMain" style={{ backgroundColor: 'white', marginTop: 0 }} >
          <Link to='/'>
            <div >
              <img
                src="https://i.ibb.co/kG5RxHg/StyleHub.png"
                alt=""
                style={{ width: "100px" }}
              />
            </div>
          </Link>
          <div className="firstNavMain">
            <nav id="nav">
              <ul>
                {/* categories */}
                {
                  categories?.length >= 0 &&
                    categories?.map((e) =>
                      <Link key={e.id} to={`/categories/${e.id}`} relative='path'>
                        <span>
                          {e?.name}
                        </span>
                      </Link>
                    )
                }
              </ul>
              
              
            </nav>
          </div>
          <div className="secondNavMain">
            <div>
              <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Product name, vendor" />
              <span onClick={handleSearch}>
                <SearchIcon />
              </span>
              {search !== "" && DATA?.length > 0 ? <> <Box   >

                <Box textAlign={"left"} overflow={'scroll'} width={"54vh"} maxH={'71vh'} zIndex={'100000'} bg='white' pos='absolute' borderRadius={"14px"} color='black' p='2' pt={"10"}>
                  {

                    DATA?.map((el) => (
                      <Flex alignItems={"center"} gap={"20px"} padding={"5px"} cursor={"pointer"}>
                        <Image w={"30%"} src={el?.images?.image1} />
                        <h5 onClick={() => handleNavigate1(el?.id)}>{el?.title}</h5>
                      </Flex>
                    ))
                  }
                </Box></Box></> : " "}
            </div>
          </div>
          <div className="thirdNavMain">
            {(user !== undefined && user !== null) ? (
              (user.role == "ADMIN") ? (
                <>
                  <div>
                    <Link to={'/warehouses'}>
                      <img
                        src="https://img.icons8.com/?size=256&id=20156&format=png"
                        style={{ width: "25px" }}
                        alt=""
                      />
                    </Link>
                  </div>
                  <Link to={'/carts'}> <div>
                    <img
                      src="https://img.icons8.com/?size=50&id=9671&format=png"
                      style={{ width: "25px" }}
                      alt=""
                    />
                  </div></Link>
                  <Link to={'/orders'}> <div>
                    <img
                      src="https://img.icons8.com/?size=50&id=4255&format=png"
                      style={{ width: "25px" }}
                      alt=""
                    />
                  </div></Link>
                  <div>
                    <Link to={'/notifications'}>
                      <img
                        src="https://img.icons8.com/?size=50&id=11642&format=png"
                        style={{ width: "25px" }}
                        alt=""
                      />
                    </Link>
                  </div>
                  
                  <div>
                    <Link to={'/profile'}>
                      <img
                        src="https://img.icons8.com/?size=50&id=11730&format=png"
                        style={{ width: "25px" }}
                        alt=""
                      />
                    </Link>
                  </div>
                </>
              ) : (
                (user.role == "SELLER") ? (
                  <>
                    <Link to={'/carts'}> <div>
                      <img
                        src="https://img.icons8.com/?size=50&id=9671&format=png"
                        style={{ width: "25px" }}
                        alt=""
                      />
                    </div></Link>
                    <Link to={'/orders'}> <div>
                      <img
                        src="https://img.icons8.com/?size=50&id=4255&format=png"
                        style={{ width: "25px" }}
                        alt=""
                      />
                    </div></Link>
                  </>
                ) : (
                  <>
                    <div>
                      <Link to={'/warehouses'}>
                        <img
                          src="https://img.icons8.com/?size=256&id=20156&format=png"
                          style={{ width: "25px" }}
                          alt=""
                        />
                      </Link>
                    </div>
                  </>
                )
              )
            ) : (
              <></>
            )}
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant='outline'
              />
              <MenuList>
                <MenuItem icon={<div>
                    <Image
                      src={(user?.avatar) || "https://img.icons8.com/?size=50&id=11730&format=png"}
                      style={{ width: "25px" }}
                      alt=""
                    />
                  </div>}
                  onClick={() => navigate("/profile")}>
                  Profile
                </MenuItem>
                <MenuItem icon={<ExternalLinkIcon />}>
                  Post
                </MenuItem>
                {/* <MenuItem icon={<RepeatIcon />} command='⌘⇧N'> */}
                <MenuItem icon={<RepeatIcon />}>
                  Settings
                </MenuItem>
                {(localStorage.getItem('user') == undefined || localStorage.getItem('user') == null) ? (
                  <MenuItem _hover={{ backgroundColor: "pink.400" }} display={D2} onClick={() => navigate("/signin")}>Login</MenuItem>
                ) : (
                  <MenuItem _hover={{ backgroundColor: "pink.400" }} display={D2} onClick={handleLogout}>Logout</MenuItem>
                )}
              </MenuList>
            </Menu>
            
          </div>
        </div>
      ) : (
        <MobNav2 setHamburger={setHamburger} hamburger={hamburger} />
      )}
    </div>
  );
};

export default Nav;
