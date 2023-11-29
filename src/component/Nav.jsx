import React, { useEffect, useRef, useState } from "react";
import { PhoneIcon, AddIcon, WarningIcon, SearchIcon } from "@chakra-ui/icons";
import "../CSS/Nav.css";
import MobileNav from "./NavBar/MobileNav";
import { Link, useNavigate } from "react-router-dom";
import MobNav2 from "./NavBar/MobNav2";
import axios from "axios";
import { Box, Button, Flex, Image } from "@chakra-ui/react";
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
    navigate(`/product/${id}`, { state: data })

  }

  const handleSearch = () => {
    console.log("Searching...")
  }
  // const ref1 = useRef()
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
                    // categories.slice(((page - 1) * 15), (((page - 1) * 15) + 15)).map((e) =>
                    // <Box onClick={()=>navigate(`/products/${e.id}`,{state:"men"})}>
                    //       < CardForMensAndWomen key={e.id} props={e} />
                    //     </Box>)
                    categories?.map((e) =>
                      // <Link to={formatURL(e?.name)}>
                      //   <span>
                      //     {e?.name}
                      //   </span>
                      // </Link>
                      <Link key={e.id} to={`/categories/${e.id}`} relative='path'>
                        <span>
                          {e?.name}
                        </span>
                      </Link>
                    )
                }
              </ul>
              
              {/* <ul>
                
                <li>
                  <Link to={'/mens'}>
                    <span>
                      Men
                    </span>
                  </Link>
                  <div class="subMenu">
                    <div id="mobiles" class="submenuList">
                      <div>
                        <p style={{ color: "#EC407A" }}>Top-Wear</p>
                        <p>T-Shirt</p>
                        <p>Casual Shirts</p>
                        <p>Formal Shirts</p>
                        <p>Sweat Shirt</p>
                        <p>Jacket</p>
                        <p>Sweater</p>
                        <p>Suits</p>
                        <p>Rain Jacket</p>
                        <hr />
                        <p style={{ color: "#EC407A" }}>
                          Indian & Festive Wear
                        </p>
                        <p>Kurta & Kurts's Set</p>
                        <p>Sherwani</p>
                        <p>Dhotis</p>
                      </div>
                      <div>
                        <p style={{ color: "#EC407A" }}>Bottom-Wear</p>
                        <p>Jeans</p>
                        <p>Casual Trousers</p>
                        <p>Formal Trousers</p>
                        <p>Shorts</p>
                        <p>Tract-Pents & Jooggers</p>
                        <hr />
                        <p style={{ color: "#EC407A" }}>
                          Inner Wear & Sleep Wear
                        </p>
                        <p>Briefs & Trunks</p>
                        <p>Boxers</p>

                        <p>Vests</p>
                        <p>Spleepwear & Loungewear</p>
                        <p>Thermals</p>
                        <hr />
                        <p style={{ color: "#EC407A" }}>Plus Size</p>
                      </div>
                      <div>
                        <p style={{ color: "#EC407A" }}>Footwears</p>
                        <p>Shoes</p>
                        <p>Casual Shoes</p>
                        <p>Formal Shoes</p>
                        <p>Sport Shoes</p>
                        <p>Sneakers</p>
                        <p>Sendal & Footwear</p>
                        <p>Flip Flops</p>
                        <p>Socks</p>
                        <hr />
                        <p style={{ color: "#EC407A" }}>
                          Personal care & Grooming
                        </p>
                        <p style={{ color: "#EC407A" }}> Sunglasses & Frames</p>
                        <p style={{ color: "#EC407A" }}>Watches</p>
                        {/* <p>Dhotis</p>
                      </div>
                      <div>
                        <p style={{ color: "#EC407A" }}>Sports & Active-Wear</p>
                        <p>Sports Shoes</p>
                        <p>Sports Sendals</p>
                        <p>Active T-Shirts</p>
                        <p>Track Pants</p>
                        <p>Tractsuits</p>
                        <p>Jacktes</p>
                        <p>Accessories</p>
                        <p>Swimming Suits</p>
                        <hr />
                        <p style={{ color: "#EC407A" }}>Gadgets</p>
                        <p>Fitness Gadgets</p>
                        <p>Headphones</p>
                        <p>Speakers</p>
                      </div>
                      <div>
                        <p style={{ color: "#EC407A" }}>Fashion Accessories</p>
                        <p>Wallets</p>
                        <p>Belts</p>
                        <p>Perfumes</p>
                        <p>Treamer</p>
                        <p>Deodrant</p>
                        <p>Ties</p>
                        <p>Accessories Gift-Set</p>
                        <p>Caps & Hats</p>

                        <p>Phone Cases</p>
                        <p>Rings & Neckles</p>
                        <hr />
                        <p style={{ color: "#EC407A" }}>Bag & Bag-Packs</p>
                        <p style={{ color: "#EC407A" }}>Luggage & Trolly </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul> */}
            </nav>
          </div>
          <div className="secondNavMain">
            <div>
              <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
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
                  <div>
                    <Link to={'/shops'}>
                      <img
                        src="https://img.icons8.com/?size=50&id=489&format=png"
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
            
            {/* <Button backgroundColor={'pink.500'} color={"white"} _hover={{ backgroundColor: "pink.400" }} display={D2} onClick={() => navigate("/signup")}>Login</Button> */}
            {/* Login button */}
            {(localStorage.getItem('user') == undefined || localStorage.getItem('user') == null) ? (
              <Button backgroundColor={'pink.500'} color={"white"} _hover={{ backgroundColor: "pink.400" }} display={D2} onClick={() => navigate("/signin")}>Login</Button>
            ) : (
              <Button backgroundColor={'pink.500'} color={"white"} _hover={{ backgroundColor: "pink.400" }} display={D2} onClick={handleLogout}>Logout</Button>
            )}
            {/* <Button backgroundColor={'pink.500'} color={"white"} _hover={{ backgroundColor: "pink.400" }} display={D2} onClick={() => navigate("/signin")}>Login</Button>
            <Button backgroundColor={'pink.500'} color={"white"} _hover={{ backgroundColor: "pink.400" }} display={D2} onClick={logouts}>Logout</Button> */}
          </div>
        </div>
      ) : (
        <MobNav2 setHamburger={setHamburger} hamburger={hamburger} />
      )}
    </div>
  );
};

export default Nav;
