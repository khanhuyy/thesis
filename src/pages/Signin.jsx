import React, { useState } from "react";
import { auth } from "../firebase";
import axios from "axios";
import OtpInput from "otp-input-react";
import { RecaptchaVerifier, signInWithEmailAndPassword, signInWithPhoneNumber } from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import {
  Box,
  Center,
  Heading,
  HStack,
  Image,
  VStack,
  Text,
  Input,
  InputLeftAddon,
  InputGroup,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Link as ChakraLink,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../Url";

export const Signin = () => {
  const [isAuth,setAuth] = useState(false)
  const [ph, setph] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const [userID, setUserID] = useState();
  const [userCart, setUserCart] = useState();
  const toast = useToast()
  const navigate = useNavigate();
  const onSignin = (e) => {
    e.preventDefault()
    axios.get(`${baseUrl}/users?email=${email}&password=${password}`)
    .then((doc) => {
      setUser(doc.data[0])
      if (doc.data?.length > 0) {
        // const userData = getUserCart(doc.data[0].id)
        localStorage.setItem('user', JSON.stringify(doc.data[0]))
        localStorage.setItem('login', true)
      }
      navigate("/")
    })
    .catch((err) => console.log(err))
  };


  return(
    <>
      <div>
        {
          <Box>
            {/* <Toaster toastOptions={{ duration: 1000 }} /> */}
            <Box id="recaptcha-container"> </Box>

            <Center w={"full"} bgColor="#fceeea" h={"100vh"}>
              <VStack w={"420px"} spacing="0">
                <Box>
                  <Image src="https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2022/9/21/8fca3ae9-d245-443b-a142-8d568247794c1663700243878-offer-banner-300-600x240-code-_-MYNTRA400.jpg" />
                </Box>

                <Box w={"100%"} p={"40px 30px 10px 30px"} bgColor="white">
                  <FormControl isRequired>
                    <FormLabel display={"flex"} as="div">
                      <Center>
                        <HStack
                          w="full"
                          alignItems={"baseline"}
                          gap="0"
                          spacing={"5px"}
                        >
                          <Heading
                            fontWeight={"600"}
                            as={"h2"}
                            color="#424553"
                            fontSize="24px"
                            size="lg"
                          >
                            Login
                          </Heading>
                        </HStack>
                      </Center>
                    </FormLabel>

                    <InputGroup mt={30} size={"sm"} variant={"outline"}>
                      <Input
                        p={"15px 10px"}
                        focusBorderColor="#f4f4f4"
                        maxLength={30}
                        minLength={30}
                        type="tel"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </InputGroup>

                    <InputGroup mt={30} size={"sm"} variant={"outline"}>
                      <Input
                        p={"15px 10px"}
                        focusBorderColor="#f4f4f4"
                        maxLength={30}
                        minLength={30}
                        type="tel"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </InputGroup>

                    <FormHelperText mt={8} color={"#a7a9af"} textAlign="left">
                      By continuing, I agree to the&nbsp;
                      <ChakraLink
                        fontWeight={"bold"}
                        _hover={{ textDecoration: "none" }}
                        color={"#ff3f6c"}
                        href="#"
                      >
                        Terms of Use&nbsp;
                      </ChakraLink>
                      &&nbsp;
                      <ChakraLink
                        fontWeight={"bold"}
                        _hover={{ textDecoration: "none" }}
                        color={"#ff3f6c"}
                        href="#"
                      >
                        Privacy Policy&nbsp;
                      </ChakraLink>
                    </FormHelperText>

                    <Button
                      w={"100%"}
                      mt={8}
                      mb={4}
                      variant="solid"
                      backgroundColor="#ff3f6c"
                      color={"#fff"}
                      borderRadius="0"
                      colorScheme={"none"}
                      type="submit"
                      onClick={onSignin}
                    >
                      Login
                    </Button>
                  </FormControl>

                  <Text mb={10} color={"#a7a9af"} textAlign="left">
                    Have trouble logging in?
                    <ChakraLink
                      fontWeight={"bold"}
                      _hover={{ textDecoration: "none" }}
                      color={"#ff3f6c"}
                      href="#"
                    >
                      &nbsp;Get help
                    </ChakraLink>
                  </Text>
                  <Text mb={10} color={"#a7a9af"} textAlign="left">
                    No account yet
                    <ChakraLink
                      fontWeight={"bold"}
                      _hover={{ textDecoration: "none" }}
                      color={"#ff3f6c"}
                      to
                    >
                      <Link to={`/signup`} >
                        <span>&nbsp;Signup</span>
                      </Link>
                    </ChakraLink>
                  </Text>
                </Box>
              </VStack>

            </Center>
           
          </Box>
        }
      </div>
    </>
  )
};

export default Signin;