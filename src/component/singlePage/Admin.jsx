import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SinglePageGrid from './SinglePageGrid'
import "../../CSS/SingleProduct.css"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Stack,useToast } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import Nav from '../Nav'
import Footer from '../footer/Footer'
import {collection, onSnapshot, query, where, getDoc, doc } from "firebase/firestore";
import db from "../../service/firestore";

const url = `https://glorious-robe-calf.cyclic.app`
const Admin = () => {
    
    return (
        <div>
            <Nav />

            <Footer />
        </div>

    )
}

export default Admin;