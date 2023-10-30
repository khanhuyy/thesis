import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SinglePageGrid from './SinglePageGrid'
import "../../CSS/SingleProduct.css"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Input, InputGroup, Stack, Text, Button, ButtonGroup, Select, filter } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import Nav from '../Nav'
import Footer from '../footer/Footer'
import { baseUrl } from '../../Url'

const CreateProduct = () => {
    const [categories, setCategories] = useState();
    const [attributes, setAttributes] = useState();
    const [attributeValues, setAttributeValues] = useState();
    const [warehouses, setWarehouses] = useState();
    const [selectedAttribute, setSelectedAttribute] = useState();
    const [productAttributes, setProductAttributes] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedWarehouse, setSelectedWarehouse] = useState();
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
        axios.get(`${baseUrl}/warehouses`)
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

    const handleCategory = (e) => {
        const qty = e.target.value;
        setSelectedCategory(qty);
    }

    const handleWarehouse = (e) => {
        const qty = e.target.value;
        setSelectedWarehouse(qty);
    }

    const createProduct = () => {
        axios.post(`${baseUrl}/products`, {
            "createdAt": currentdate,
            "brandID": 37,
            "availableColors": [],
            "image": "https://loremflickr.com/640/480/fashion", // todo
            "price": "806",
            "sizes": [
                12,
                23,
                34
            ],
            "productFlag": 1,
            "warehouseID": 1,
            "categoryIds": ["7"]
        }).then((doc) => {
            setCategories(doc.data);
        })
        .catch((err) => console.log(err));
    }

    return (
        <div>
            <Nav />
            <Stack width='50%' display='block'>
                <Text fontSize='2xl' as='b'>Name</Text>
                <Input placeholder='Name'/>
                <br />
                <Text fontSize='2xl' as='b'>Image</Text>
                <Input placeholder='Image'/>
                <br />
                <Text fontSize='2xl' as='b'>Category</Text>
                <Select variant="flushed" value={selectedCategory} onChange={ handleCategory } textAlign={'left'} maxW={"max-content"}   >
                    {categories?.length && categories?.map((category) => (
                        <option key={category?.id} value={category?.id}>{category?.name}</option>
                    ))}
                </Select>
                <br />
                <Text fontSize='2xl' as='b'>Attribute</Text>
                <Select  variant="flushed" value={selectedAttribute} onChange={ addNewProductAttribute } textAlign={'left'} maxW={"max-content"}   >
                    {attributes?.length && attributes?.map((attribute) => (
                        <option key={attribute?.id} value={attribute?.id}>{attribute?.name}</option>
                    ))}
                </Select>
                <Text fontSize='2xl'>Sizes</Text>
                {/* <Select  variant="flushed" value={selectedAttribute} onChange={ handleAttribute } textAlign={'left'} maxW={"max-content"}   >
                    {attributes?.length && attributes?.map((attribute) => (
                        <option key={attribute?.id} value={attribute?.id}>{attribute?.name}</option>
                    ))}
                </Select> */}
                <br />
                <Text fontSize='2xl' as='b'>Price</Text>
                <Input placeholder='Price'/>
                <Text fontSize='2xl' as='b'>Quantity</Text>
                <Input placeholder='Quantity' />
                <Text fontSize='2xl' as='b'>Warehouse</Text>
                <Select  variant="flushed" value={selectedWarehouse} onChange={ handleWarehouse } textAlign={'left'} maxW={"max-content"}   >
                    {warehouses?.length && warehouses?.map((warehouse) => (
                        <option key={warehouse?.id} value={warehouse?.id}>{warehouse?.name}</option>
                    ))}
                </Select>
                <br />
                <Text fontSize='2xl' as='b'>Another</Text>
                <Button onClick={createProduct} colorScheme='blue'>Add Product</Button>
            </Stack>
            
            <Footer />
        </div>

    )
}

export default CreateProduct;