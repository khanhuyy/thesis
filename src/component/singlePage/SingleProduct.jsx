import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SinglePageGrid from './SinglePageGrid'
import "../../CSS/SingleProduct.css"
import SingleProductSecond from './SingleProductSecond'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Stack,useToast } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import Nav from '../Nav'
import Footer from '../footer/Footer'
import {collection, onSnapshot, query, where, getDoc, doc } from "firebase/firestore";
import db from "../../service/firestore";
import { baseUrl } from '../../Url'

const url = `https://glorious-robe-calf.cyclic.app`
const SingleProduct = () => {
    const {id} = useParams()
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    const [itemExisted, setItemExisted] = useState(false);
    const [cart, setCart] = useState();
    const [product, setProduct] = useState({
        rating: "",
        count: "",
        images: {
            image1: "",
            image2: "",
            image3: "",
            image4: ""
        },
        image: "",
        brand: "",
        title: "",
        sizes: [
        ],
        price: "",
        productDiscountPercentage: "",
        quantity: 0,
        gender: "",
        category: ""
    })
    const fetchProduct = () => {
        axios.get(`${baseUrl}/products/${id}`)
        .then((doc) => {
            setProduct(doc.data);
            })
        .catch((err) => console.log(err))
      }
    useEffect(() => {
        fetchProduct()
    }, [])
    const AddToCartToast = (title) => {
      toast({
        title:title,
        // description: des, 
        status: 'success',
        position: 'top',
        duration: 3000,
        isClosable: true,
      })
    }
    const productInCart = () => {
        axios.get(`${baseUrl}/cartItems?cartID=1&productID=${id}`)
        .then((doc) => {
            if (doc.data == null || doc.data?.length == 0) {
                setItemExisted(false);
            } else {
                setItemExisted(true);
            }
        })
        .catch((err) => console.log(err))
    }
    useEffect(() => {
        const result = productInCart();;
        setItemExisted(result);
    }, []);
    const addToCart = () => {
        axios.post(`${baseUrl}/cartItems`, {
                "cartID": 1,
                "productID": id,
                "price": 100000, // todo
                "quantity": 1
            }).then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const fetchData = () => {
        axios.get(`${baseUrl}/carts/${1}`)
        .then((doc) => {
                setCart(doc.data);
            })
        .catch((err) => console.log(err))
      }
    const updateCart = () => {
        axios.put(`${baseUrl}/carts/${1}`, {
                "productID": id,
                "price": 100000, // todo
                "quantity": 1
            }).then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    return (
        <div>
            <Nav />
            <Stack
                spacing={2}
                align="stretch"
                // border={"1px solid black"}
                marginBottom="20px"
            >
                <Breadcrumb className={"breadcrummb"}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Clothing</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink as={"b"} fontSize={"13px"} cursor="text">
                            {product?.brand}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Stack>
            <div className='SingleFlex'>

                <div>
                    {product?.image ? <SinglePageGrid datas={[product.image, product.image, product.image]} /> : ''}
                    {/* <SinglePageGrid data={[data?.images?.image1,data?.images?.image2,data?.images?.image3]}/> */}
                </div>
                <div>
                    {product ? 
                    <SingleProductSecond 
                        addToCart={addToCart} 
                        id={product?.id}
                        title={product?.title} 
                        brand={product?.brand} 
                        rating={product?.rating} 
                        count={product?.count} 
                        price={product?.price} 
                        discount={product?.productDiscountPercentage} 
                        size={product?.sizes}
                        exist={itemExisted} /> 
                    : ''}
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default SingleProduct