import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SinglePageGrid from './SinglePageGrid'
import "../../CSS/SingleProduct.css"
import { Box, HStack, Image, Input, InputGroup, Stack, Text, Button, ButtonGroup, Select, filter, Container, Flex, useToast, UnorderedList, ListItem } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import Nav from '../Nav'
import Footer from '../footer/Footer'
import { baseUrl } from '../../Url'
import { FaStar } from 'react-icons/fa';
import { CiDeliveryTruck } from 'react-icons/ci';
import { AiOutlineMobile } from 'react-icons/ai';
import { TbTruckReturn } from 'react-icons/tb';

const CreateNewProduct = () => {
    const [categories, setCategories] = useState();
    const [attributes, setAttributes] = useState();
    const [brands, setBrands] = useState();
    const [attributeValues, setAttributeValues] = useState();
    const [warehouses, setWarehouses] = useState();
    const [selectedAttribute, setSelectedAttribute] = useState();
    const [selectedBrand, setSelectedBrand] = useState();
    const [productAttributes, setProductAttributes] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedWarehouse, setSelectedWarehouse] = useState();
    const [ imageUrl, setImageUrl ] = useState("");
    const [ name, setName ] = useState()
    const [ quantity, setQuantity ] = useState()
    const [ price, setPrice ] = useState()
    const toast = useToast()
    const user = JSON.parse(localStorage.getItem('user'));
    const currentdate = new Date();
    const fetchAttribute = () => {
        axios.get(`${baseUrl}/attributes`)
          .then((doc) => {
            setAttributes(doc.data);
          })
          .catch((err) => console.log(err))
      }
    useEffect(() => {
        fetchAttribute()
    }, [])
    const getBrands = () => {
        axios.get(`${baseUrl}/brands`)
        .then((doc) => {
            setBrands(doc.data)
        })
        .catch((err) => console.log(err))
    }
    useEffect(() => {
        getBrands()
    }, [])

    const fetchCategories = () => {
        axios.get(`${baseUrl}/categories`)
          .then((doc) => {
            setCategories(doc.data);
          })
          .catch((err) => console.log(err))
      }
    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchWarehouses = () => {
        axios.get(`${baseUrl}/warehouses?ownerId=${user.id}`)
          .then((doc) => {
            setWarehouses(doc.data);
          })
          .catch((err) => console.log(err))
      }
    useEffect(() => {
        fetchWarehouses()
    }, [])

    const addNewProductAttribute = (e) => {
        const qty = e.target.value;
        setProductAttributes(qty);
    }

    const handleBrand = (e) => {
        const brand = e.target.value;
        setSelectedBrand(brand);
    }
    
    const handleCategory = (e) => {
        const qty = e.target.value;
        setSelectedCategory(qty);
    }

    const handleWarehouse = (e) => {
        const qty = e.target.value;
        setSelectedWarehouse(qty);
    }
    const createProduct = () => {
        axios.get()
        axios.post(`${baseUrl}/products`, {
            "name": name,
            "createdAt": currentdate,
            "brandID": selectedBrand?.id,
            "availableColors": [],
            "image": imageUrl,
            "price": price,
            "quantity": quantity,
            "sizes": [
                12,
                23,
                34
            ],
            "ownerId": user.id,
            "productFlag": 1,
            "warehouseID": selectedWarehouse?.id,
            "categoryIds": ["7"]
        }).then((doc) => {
            toast({
                title: 'Created',
                description: "Product's created. PLease check in shop",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position:"top"
            })
        })
        .catch((err) => console.log(err));
    }
    const uploadImageIconUrl = 'https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg'
    return (
      <>
      <Nav />
      <div className='SingleFlex'>
        
        <div>
            {(imageUrl === "")? <SinglePageGrid datas={[uploadImageIconUrl, uploadImageIconUrl, uploadImageIconUrl]} /> 
            : <Image src={imageUrl} alt={uploadImageIconUrl} w={["100%","100%","100%"]}/>}
        </div>
        <div>
        <Box>
          <Text fontSize='3xl' as='b'>Image URL</Text>
          <Input placeholder='Image URL' onChange={(e) => setImageUrl(e.target.value)}/>
        
        <Text fontSize='3xl' as='b'>Attribute</Text>
        <Select  variant="flushed" value={selectedAttribute} onChange={ addNewProductAttribute } textAlign={'left'} maxW={"max-content"}   >
          <option key={40} value={40}>{40}</option>
          <option key={41} value={41}>{41}</option>
          <option key={42} value={42}>{42}</option>
        </Select>
        <Text fontSize='3xl' as='b'>Category</Text>
        <Select variant="flushed" value={selectedCategory} onChange={ handleCategory } textAlign={'left'} maxW={"max-content"}   >
            {categories?.length && categories?.map((category) => (
                <option key={category?.id} value={category?.id}>{category?.name}</option>
            ))}
        </Select>
        <Box>
          <Text fontSize={"18px"} as={"b"}>
            {price}{" "}
            <span style={{ fontSize: "18px", color: "orange" }}>
              {" "}
              {/* &nbsp; {discount} */}
            </span>
          </Text>
        </Box>
        <Text fontWeight={"600"} fontSize={"30px"} mt={"1%"}>VATS: </Text>
        <Select>
          <option key={40} value={40}>{"YES"}</option>
          <option key={41} value={41}>{"NO"}</option>
        </Select>
        <br />
        <Text fontSize='3xl' as='b'>Price</Text>
        <Input placeholder='Price' onChange={(e) => setPrice(e.target.value)} />
        <br /><br />
        <Text fontSize='3xl' as='b'>Quantity</Text>
        <Input placeholder='Quantity' onChange={(e) => setQuantity(e.target.value)} />
        <br /><br />
        <Text fontSize='3xl' as='b'>Warehouse</Text>
        <Select  variant="flushed" value={selectedWarehouse} onChange={ handleWarehouse } textAlign={'left'} maxW={"max-content"}   >
            {warehouses?.length && warehouses?.map((warehouse) => (
                <option key={warehouse?.id} value={warehouse?.id}>{warehouse?.name}</option>
            ))}
        </Select>
        <br />
        <br />
        <Box display={"flex"} alignItems={"center"} mt={"4%"}>
          <CiDeliveryTruck size={"25px"} />
          <Text fontWeight={"600"} fontSize={["1.1rem","1.7rem","1.2rem"]} ml={"2%"} > Get it by Sat, Apr 08 </Text>
        </Box>

        <Box display={"flex"} alignItems={"center"} mt={"2%"}>
          <AiOutlineMobile size={"25px"} />
          <Text fontWeight={"600"} fontSize={["1.1rem","1.7rem","1.2rem"]} ml={"2%"} > Pay on delivery available </Text>
        </Box>

        <Box display={"flex"} alignItems={"center"} mt={"2%"}>
          <TbTruckReturn size={"25px"} />
          <Text fontWeight={"600"} fontSize={["1.1rem","1.7rem","1.2rem"]} ml={"2%"} >Easy 14 days return & exchange available </Text>
        </Box>

        <Text fontWeight={"400"} fontSize={["1.1rem","1.7rem","1.2rem"]} mt={"2%"} mb={"2%"}>100% Original Products</Text>
        <Flex>
          <Text fontWeight={"600"} fontSize={["1.1rem","1.7rem","1.2rem"]} mt={"2%"} mb={"2%"}>Price From:</Text>
          <Text fontWeight={"600"} fontSize={["1.1rem","1.7rem","1.2rem"]} mt={"2%"} mb={"2%"}>Commission:</Text>
          <Text fontWeight={"600"} fontSize={["1.1rem","1.7rem","1.2rem"]} mt={"2%"} mb={"2%"} color={"orange"}>{price}</Text>
        </Flex>
        <Box>
          <UnorderedList>
            <ListItem>Applicable on: Orders above Rs. 1999</ListItem>
            <ListItem>Coupon code: FESTIVE300</ListItem>
            <ListItem>Coupon Discount: Rs. 81 off (check cart for final savings)</ListItem>
            
          </UnorderedList>
        </Box>
        <Text fontWeight={"600"} fontSize={["1.1rem","1.7rem","1.2rem"]} mt={"2%"} mb={"2%"} color={"pink.500"}>View Eligible Products</Text>
        <Text fontWeight={"650"} fontSize={["1.1rem","1.7rem","1.2rem"]} mt={"2%"} mb={"2%"} color={"black"}>EMI options available</Text>

        <Box>
        <UnorderedList>
            <ListItem>EMI starting from Rs.26/month</ListItem>
            </UnorderedList>
        </Box>
        <Text fontWeight={"600"} fontSize={["1.1rem","1.7rem","1.2rem"]} mt={"2%"} mb={"2%"} color={"pink.500"}>View plans</Text>
        <Text fontWeight={"650"} fontSize={["1.1rem","1.7rem","1.2rem"]} mt={"2%"} mb={"1%"} color={"black"}>Product Details</Text>
        {/* <Text fontWeight={"500"} fontSize={["1.1rem","1.7rem","1.2rem"]} mt={"1%"} mb={"2%"} color={"black"}>{title}</Text> */}


        {/* <hr style={{marginTop:"5%"}}/> */}







      </Box>
      <Button onClick={createProduct} colorScheme='blue'>Add Product</Button>
      </div>
      </div>
      </>
    )
}

export default CreateNewProduct;