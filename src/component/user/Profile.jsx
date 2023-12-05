import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  SimpleGrid,
  Center,
  Stack,
  Box,
  Button,
  Image,
  Container,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  Input,
  ButtonGroup,
  IconButton,
  Flex,
  Text
} from "@chakra-ui/react";
import {
  doc,
  getDoc,
} from 'firebase/firestore';
import React, { useRef, useState } from "react";

import { ChevronDownIcon, SearchIcon,
  EditIcon,
  CheckIcon,
  CloseIcon
} from "@chakra-ui/icons";

import Footer from '../footer/Footer'
import { useEffect } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import Nav from "../Nav";
import axios from "axios";
import { baseUrl } from "../../Url";

const Profile = () => {
  const [ image, setImage ] = useState();
  
  const navigate = useNavigate();
  const [hamburger, setHamburger] = useState(false)
  const [shop, setShop] = useState();
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
  const user = JSON.parse(localStorage.getItem("user"))
  return (<Box mt={"0px"}>

    <Box>
      <Nav setHamburger={setHamburger} hamburger={hamburger} />
      <Container maxW="70%">
        <div style={{display: "inline-flex"}}>
          <div style={{display: "flex"}}>
            Account Info
            Change Password
          </div>
          <Stack style={{alignItems: "center"}}>
            <div style={{display: "inline-flex", maxWidth: "100%"}}>
              <div style={{width: "70%"}}>
                <Text fontSize='3xl' as='b'>Email</Text>
                <Editable defaultValue='Take some chakra'>
                  <EditablePreview />
                  <EditableInput />
                </Editable>
                <Text fontSize='3xl' as='b'>Name</Text>
                <Editable defaultValue='Take some chakra'>
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </div>
              <div>
                <Image 
                  src={user?.avatar}
                  alt="user image"
                  w={"200px"}
                />
                <Button onClick={onFileUpload}> Change Image </Button>
              </div>
              
            </div>
            <Button>Save</Button>
          </Stack>
        </div>
      </Container>
      <Footer />
    </Box>
  </Box>
  )
}

export default Profile
