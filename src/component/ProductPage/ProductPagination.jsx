import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  SimpleGrid,
  HStack,
  Checkbox,
  Menu,
  Center,
  MenuButton,
  Spinner,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Box,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";

import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";

import Footer from '../footer/Footer'
import { useEffect } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import CardForMensAndWomen from "./CardForMensAndWomen";
import Pagination from "./Pagination";
import Nav from "../Nav";
import MobileNav from "../NavBar/MobileNav";
import { baseUrl } from "../../Url";
import axios from "axios";

const ProductPaganation = ({id}) => {
  const navigate = useNavigate();
  // filter
  const [brands, setBrands] = useState()
  const [categories, setCategories] = useState() // level 2
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1)
  const [hamburger, setHamburger] = useState(false)

  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);

  const [filters, setFilters] = useState({
    "categoryIds": [],
    "brandIds": []
  });
  const [sort, setSort] = useState("");
  const [_sort, setSortBy] = useState("Recommended");


  const [params, setParams] = useSearchParams();
  const [finalFilter, setFinalFilter] = useState({});

  const { search } = useLocation()

  const fetchBrands = () => {
    axios.get(`${baseUrl}/brands`).then(
      (doc) => {
        setBrands(doc.data);
      })
      .catch((err) => console.log(err)
    )
  }
  useEffect(() => {
    fetchBrands()
  }, [])

  const fetchCategories = () => {
    axios.get(`${baseUrl}/categories?level=${2}&parentId=${1}`).then(
      (doc) => {
        setCategories(doc.data)
      })
      .catch((err) => console.log(err)
    )
  }
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchProducts = () => {
    axios.get(`${baseUrl}/products?categoryIds_like=${filters["categoryIds"]}&brandIds_like=${filters["brandIds"]}`).then(
      (doc) => {
        setProducts(doc.data);
      })
      .catch((err) => console.log(err)
    )
  }
  useEffect(() => {
    fetchProducts()
  }, [finalFilter])

  const handleChange = ({ target }) => {
    if (target.name == "categoryIds") {
      setFilters({...filters, categoryIds:[...new Set([...filters.categoryIds, target.value])]});
    } else if (target.name == "brandIDs") {
      setFilters({...filters, brandIds:[...new Set([...filters.brandIds, target.value])]});
    }
  };
  useEffect(() => {
    setParams(finalFilter);
  }, [finalFilter]);

  console.log(filters);

  useEffect(() => {
    if (sort === "asc" || sort === "desc") {
      setFinalFilter({ ...finalFilter, _sort: "price", _order: sort })
    }
    else if (sort === "") {
      const newFilter = { ...filters }
      delete finalFilter['_sort']
      setFinalFilter(newFilter)
    }
    else {
      setFinalFilter({ ...finalFilter, _sort: sort });
    }
  }, [sort]);



  // price[i][1]
  // price[i][4]

  const prices = [
    "159đ to 1619đ",
    "1619đ to 3079đ",
    "3079đ to 4539đ",
    "4539đ to 5999đ",
  ];

  const Discounts = [
    "10% and above",
    "20% and above",
    "30% and above",
    "40% and above",
    "50% and above",
    "60% and above",
    "70% and above",
    "80% and above",
  ];

  const deliveryTime = ["Within 2 Days", "Within 3 Days", "Within 4 Days"];

  const timerRef = useRef();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const btnMouseEnterEvent = () => {
    setIsOpenMenu(true);
  };

  const btnMouseLeaveEvent = () => {
    timerRef.current = window.setTimeout(() => {
      setIsOpenMenu(false);
    }, 150);
  };

  const menuListMouseEnterEvent = () => {
    clearTimeout(timerRef.current);
    timerRef.current = undefined;
    setIsOpenMenu(true);
  };

  const menuListMouseLeaveEvent = () => {
    setIsOpenMenu(false);
  };
  return (
    <Box>
      {hamburger ? <Box ><MobileNav setHamburger={setHamburger} hamburger={hamburger} /></Box> : <Box >
        {/* <Nav setHamburger={setHamburger} hamburger={hamburger}/> */}
        <Nav />
        <Stack p={"1.50rem"}>
          <Stack
            spacing={2}
            align="stretch"
            // border={"1px solid black"}
            marginBottom="20px"
          >
            <Breadcrumb className={"breadcrummb"}>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink href="#">Clothing</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink as={"b"} cursor="text">
                  Mens Wear Online Store
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>

            <Breadcrumb separator="-" className={"breadcrummb"}>
              <BreadcrumbItem>
                <BreadcrumbLink as={"b"} cursor="text" href="#">
                  Mens Wear Online Store
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink cursor="text">
                  {products.length} items
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
              className="left-side-menu"
              // width={"14%"}
              width={"15rem"}
            // minW={"15rem"}
            // minChildWidth="7.5rem"
            >
              <Stack
                width={"15rem"}
                //  minW={"15rem"}
                direction={"row"}
                justifyContent="space-between"
                placeItems={"center"}
                p={"10px 0"}
              >
                <Text
                  minWidth={"min-content"}
                  textAlign={"left"}
                  as={"b"}
                // border="1px solid black"
                >
                  {" "}
                  FILTERS
                </Text>
                <Button
                  as={"b"}
                  variant='text'
                  cursor='pointer'
                  // border="1px solid black"
                  fontSize={".8rem"}
                  color={"green"}
                  onClick={() => setFinalFilter({})}
                >
                  CONFIRM
                </Button>
                <Button
                  as={"b"}
                  variant='text'
                  cursor='pointer'
                  // border="1px solid black"
                  fontSize={".8rem"}
                  color={"#fe3f6c"}
                  onClick={() => setFinalFilter({})}
                >
                  CLEAR ALL
                </Button>
              </Stack>
              <Stack
                direction={"column"}
                textAlign="left"
                border="1px solid #e9e9ed"
                padding={".625rem .625rem"}
              >
                <HStack direction={"row"} justifyContent={"space-between"}>
                  <Text as={"b"}> CATEGORIES </Text>
                  <SearchIcon />
                </HStack>

                {categories?.map((e) => (
                  <Checkbox
                    key={e?.id}
                    name={"categoryIds"}
                    value={e.id}
                    isChecked={finalFilter?.category?.includes(`${e}`)}
                    onChange={handleChange}
                    style={{ textTransform: "capitalize" }}
                  >
                    {e?.name}
                  </Checkbox>
                ))}
              </Stack>
              <Stack
                direction={"column"}
                textAlign="left"
                border="1px solid #e9e9ed"
                padding={".625rem .625rem"}
              >
                <HStack direction={"row"} justifyContent={"space-between"}>
                  <Text as={"b"}> BRAND </Text>
                  <SearchIcon />
                </HStack>
                {brands?.map((e) => (
                  <Checkbox
                    key={e?.id}
                    name={"brandIds"}
                    value={e.id}
                    isChecked={finalFilter?.brand?.includes(`${e}`)}
                    onChange={handleChange}
                    style={{ textTransform: "capitalize" }}
                  >
                    {e?.name}
                  </Checkbox>
                ))}
              </Stack>
              <Stack
                direction={"column"}
                textAlign="left"
                border="1px solid #e9e9ed"
                padding={".625rem .625rem"}
              >
                <HStack direction={"row"} justifyContent={"space-between"}>
                  <Text as={"b"}> price </Text>
                </HStack>
                <RangeSlider aria-label={['min', 'max']} defaultValue={[10, 30]}>
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                  </RangeSliderTrack>
                  <RangeSliderThumb index={0} />
                  <RangeSliderThumb index={1} />
                </RangeSlider>
              </Stack>
              <Stack
                direction={"column"}
                textAlign="left"
                border="1px solid #e9e9ed"
                padding={".625rem .625rem"}
              >
                <HStack direction={"row"} justifyContent={"space-between"}>
                  <Text as={"b"}> DISCOUNT RANGE </Text>
                </HStack>
                {Discounts.map((e, i) => (
                  <Checkbox key={i} style={{ textTransform: "capitalize" }}>
                    {" "}
                    {e}{" "}
                  </Checkbox>
                  // <FilterByCat key={i} children={e} />
                ))}
              </Stack>
              <Stack
                direction={"column"}
                textAlign="left"
                border="1px solid #e9e9ed"
                padding={".625rem .625rem"}
              >
                <HStack direction={"row"} justifyContent={"space-between"}>
                  <Text as={"b"}> DELIVERY TIME </Text>
                </HStack>
                {deliveryTime.map((e, i) => (
                  <Checkbox key={i} style={{ textTransform: "capitalize" }}>
                    {" "}
                    {e}{" "}
                  </Checkbox>
                  // <FilterByCat key={i} children={e} />
                ))}
                <Text color={" #a39c9c"} fontSize={".8rem"} as={"i"}>
                  Estimated fastest delivery time. Refer to actual delivery time
                  in Bag.
                </Text>
              </Stack>
            </Stack>

            <Stack
              className="right-side-menu"
              w="85rem"
              p={"20px 0"}
            >
              <Stack w="100%" p={"0 18px"} alignItems={"flex-end"}>
                <Stack
                  w={"16rem"}
                  borderRadius={"12"}
                  boxShadow=" rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;"
                >
                  <Menu isOpen={isOpenMenu}>
                    <MenuButton
                      as={Button}
                      _focusVisible={"none"}
                      w={"100%"}
                      rightIcon={<ChevronDownIcon />}
                      aria-label="Courses"
                      fontWeight="normal"
                      onMouseEnter={btnMouseEnterEvent}
                      onMouseLeave={btnMouseLeaveEvent}
                    >
                      Sort by : <Text as={"b"}>{_sort}</Text>
                    </MenuButton>
                    <MenuList
                      w={"115%"}
                      onMouseEnter={menuListMouseEnterEvent}
                      onMouseLeave={menuListMouseLeaveEvent}
                      value={sort}
                      onClick={(e) => {
                        setSort(e.target.value);
                        setSortBy(e.target.name);
                      }}
                    >
                      <MenuItem name={"Recommended"} value={""}>
                        Recommended
                      </MenuItem>
                      <MenuItem name={"Brand Name"} value={"brand"}>
                        Brand Name
                      </MenuItem>
                      <MenuItem name={"Price: Low to High"} value={"asc"}>
                        Price: Low to High
                      </MenuItem>
                      <MenuItem name={"Price: High to Low"} value={"desc"}>
                        Price: High to Low
                      </MenuItem>
                      <MenuItem name={"Customer Rating"} value={"rating"}>
                        Customer Rating
                      </MenuItem>
                      <MenuItem>Popularity</MenuItem>
                    </MenuList>
                  </Menu>
                </Stack>
              </Stack>

              <Stack className="product-display">
                <Stack borderLeft="1px solid  #e9e9ed" borderTop="1px solid  #e9e9ed" p={"15px 15px"}>
                  <SimpleGrid columns={[1, 1, 2, 3, 4, 5]} m="auto" gap="40px">
                    {products?.length >= 0 &&
                      products.slice(((page - 1) * 15), (((page - 1) * 15) + 15)).map((e) =>

                          <Box onClick={()=>navigate(`/products/${e.id}`,{state:"men"})}>
                            < CardForMensAndWomen key={e.id} props={e} />
                          </Box>)}
                  </SimpleGrid>
                </Stack>
                <Center marginBottom="20px" >

                  <Pagination page={page} setPage={setPage} totalPage={Math.ceil(products?.length / 15)} />
                </Center>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Footer />
      </Box>}
    </Box>
  );
};

export default ProductPaganation