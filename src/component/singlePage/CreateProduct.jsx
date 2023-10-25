import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SinglePageGrid from './SinglePageGrid'
import "../../CSS/SingleProduct.css"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Input, InputGroup, Stack,Text,Textarea,useToast } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import Nav from '../Nav'
import Footer from '../footer/Footer'
import { baseUrl } from '../../Url'

const CreateProduct = () => {
    const [categories, setCategories] = useState();
    const [attributes, setAttributes] = useState();

    const fetchAttribute = () => {
        axios.get(`${baseUrl}/cartItems?cartID=1`)
          .then((doc) => {
            setAttributes(doc.data);
          })
          .catch((err) => console.log(err))
      }
    useEffect(() => {
    fetchAttribute()
    }, [])

    const handleQty = (e) => {

        const qty = e.target.value;
        setQty(qty)

        dispatch(updateCartProductQty(id,+qty,Price ,ogPrice))
        .then(()=>{dispatch(getCartProducts)})

    }

    return (
        <div>
            <Nav />
            <Stack>
                <Text>Name</Text>
                <Input placeholder='Name'/>
                <Textarea>Name</Textarea>
                <Textarea>Category</Textarea>
                <Text>Attribute</Text>
                <Select  variant="flushed" value={qty} onChange={ handleQty } textAlign={'center'} maxW={"max-content"}   >
                    <option value= {1}>1</option>
                    <option value= {2}>2</option>
                    <option value= {3}>3</option>
                </Select>
                <Textarea>Price</Textarea>
                <Textarea></Textarea>
                <Textarea></Textarea>
                <Textarea></Textarea>
            </Stack>
            
            <Footer />
        </div>

    )
}

export default CreateProduct;