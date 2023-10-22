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

const url = `https://glorious-robe-calf.cyclic.app`
const SingleProduct = () => {
    const {id} = useParams()
    const toast = useToast()
    const [loading, setLoading] = useState(false)
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
    const productRef = doc(db, 'products', id)
    useEffect(() => {
        getDoc(productRef)
        .then((doc) => {
            let data = doc.data();
            data.id = doc.id;
            setProduct(data);
        })
    }, []);
    console.log(product)
    
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


const addToCart = () => {
    AddToCartToast("Added to Cart")
    axios.post(`${url}/carts`, product).then((res)=>res).catch((err)=>console.log(err))
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
                        <BreadcrumbLink href="#">Home</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">Clothing</BreadcrumbLink>
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
                    {product?.images ? <SinglePageGrid datas={[product.image, product.image, product.image]} /> : ''}
                    {/* <SinglePageGrid data={[data?.images?.image1,data?.images?.image2,data?.images?.image3]}/> */}
                </div>
                <div>
                    {product ? 
                    <SingleProductSecond 
                        addToCart={addToCart} 
                        title={product?.title} 
                        brand={product?.brand} 
                        rating={product?.rating} 
                        count={product?.count} 
                        price={product?.price} 
                        discount={product?.productDiscountPercentage} 
                        size={product?.sizes} /> 
                    : ''}
                    {/* title,brand,rating,count,price,discount,size,ageGroup */}
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default SingleProduct