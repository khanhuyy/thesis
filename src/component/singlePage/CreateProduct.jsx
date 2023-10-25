import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SinglePageGrid from './SinglePageGrid'
import "../../CSS/SingleProduct.css"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Input, InputGroup, Stack,Textarea,useToast } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import Nav from '../Nav'
import Footer from '../footer/Footer'
import {collection, onSnapshot, query, where, getDoc, doc } from "firebase/firestore";
const CreateProduct = () => {
    const [categories, setCategories] = useState();
    const [attributes, setAttributes] = useState();

    return (
        <div>
            <Nav />
            <InputGroup>
                <Input placeholder='Name'/>
                <Textarea>Name</Textarea>
                <Textarea>Category</Textarea>
                <Textarea>Attribute</Textarea>
                <Textarea>Price</Textarea>
                <Textarea></Textarea>
                <Textarea></Textarea>
                <Textarea></Textarea>
            </InputGroup>
            
            <Footer />
        </div>

    )
}

export default CreateProduct;