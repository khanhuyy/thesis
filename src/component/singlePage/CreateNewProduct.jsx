import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SinglePageGrid from './SinglePageGrid'
import "../../CSS/SingleProduct.css"
import { Box, HStack, Image, Input, InputGroup, Stack, Text, Button, ButtonGroup, Select, filter, Container, Flex, useToast, UnorderedList, ListItem } from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom'
import Nav from '../Nav'
import Footer from '../footer/Footer'
import { baseUrl } from '../../Url'
import { FaStar } from 'react-icons/fa';
import { CiDeliveryTruck } from 'react-icons/ci';
import { AiOutlineMobile } from 'react-icons/ai';
import { TbTruckReturn } from 'react-icons/tb';

const CreateNewProduct = () => {
    const navigate = useNavigate()
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
    const [ image, setImage ] = useState();
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
    const state = {
      // Initially, no file is selected
      selectedFile: null,
    };

    // On file select (from the pop up)
    const onFileChange = (event) => {
        // Update the state
        this.setState({
            selectedFile: event.target.files[0],
        });
    };
    const onFileUpload = () => {
      const formData = new FormData();

      formData.append(
          "myFile",
          this.state.selectedFile,
          this.state.selectedFile.name
      );

      // Details of the uploaded file
      console.log(this.state.selectedFile);

      // Request made to the backend api
      // Send formData object
      setImage(this.state)
    };
    const fileData = () => {
        if (this.state.selectedFile) {
            return (
                <div>
                    <h2>File Details:</h2>
                    <p>
                        File Name:{" "}
                        {this.state.selectedFile.name}
                    </p>

                    <p>
                        File Type:{" "}
                        {this.state.selectedFile.type}
                    </p>

                    <p>
                        Last Modified:{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>
                        Choose before Pressing the Upload
                        button
                    </h4>
                </div>
            );
        }
    };
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
          <Input type='file' placeholder='Image File' onChange={onFileChange}/>
          <Button onClick={onFileUpload}> Upload Image </Button>
          {/* {fileData} */}
        
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
      </Box>
      <Button onClick={createProduct} colorScheme='blue'>Add Product</Button>
      </div>
      </div>
      </>
    )
}

export default CreateNewProduct;