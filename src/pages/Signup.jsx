import React, { useState } from "react";
import { auth } from "../firebase";
import axios from "axios";
import OtpInput from "otp-input-react";
import { RecaptchaVerifier, signInWithEmailAndPassword, signInWithPhoneNumber, createUserWithEmailAndPassword } from "firebase/auth";

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
  Radio,
  RadioGroup,
  Stack
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
// import Swal from "sweetalert2";
import { async } from "@firebase/util";
import { baseUrl } from "../Url";

export const Signup = () => {
  const [isAuth,setAuth] = useState(false)
  const [ph, setph] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setuser] = useState("");
  const [otp, setotp] = useState("");
  const [change, setchnage] = useState(true);
  const [role, setRole] = useState('SELLER');
  const toast = useToast()

  const [change2, setchange2] = useState(true);

  ///
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [checkemail, setcheckemail] = useState("");
  const [checkpss, setcheckpss] = useState("");

  const onsubmit = async () => {
    data.map((item) => {
      if (checkemail === "admin123@gmail.com" && checkpss === "admin") {
        navigate("/Admin");
      } else if (item.Email === checkemail && item.Password === checkpss) {
        toast({
          position: 'top',
          title: `Login successful`,
          status: 'success',
          isClosable: true,
          duration: 1500,
        })
        // setAuth(true)
        // localStorage.setItem("Login",JSON.stringify(isAuth))
        navigate("/");
      }
    });
  };

  function onCatchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSingup();
          },
          "expired-callback": () => { },
        },
        auth
      );
    }
  }

  const onSingup = (e) => {
    let exist = false
    axios.get(`${baseUrl}/users?email=${email}`).then(
      (doc) => {
        if (doc.data?.length > 0) {
          exist = true
          return
        }
      }
    )
    if (exist) {
      toast({
        title: 'Email existed',
        description: "Please login or try another email",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position:"top"
      })
      return
    }
  axios.post(`${baseUrl}/users`, {
      "userFlag": 1,
      "email": email,
      "password": password,
      "role": role

  }).then((doc) => {
    
  })
  .catch((err) => console.log(err));
  axios.get(`${baseUrl}/users?email=${email}`).then(
    (doc) => {
      if (doc.data?.length > 0) {
        localStorage.setItem('user', JSON.stringify(doc.data[0]))
        navigate("/")
      }
    }
  )
  };

  const onChangeRole = (e) => {
    setRole(e?.target?.value)
  }

  return (
    <>
      <div>
        {
          <Box>
            <Toaster toastOptions={{ duration: 1000 }} />
            <Box id="recaptcha-container"> </Box>

            {change2 ? (
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
                              Signup
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
                      <InputGroup mt={30} size={"sm"} variant={"outline"}>
                        <Input
                          p={"15px 10px"}
                          focusBorderColor="#f4f4f4"
                          maxLength={30}
                          minLength={30}
                          type="tel"
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </InputGroup>
                      <Text></Text>
                      <Text as='b'>You will wanna be?</Text>
                      <RadioGroup defaultValue='2'>
                        <Stack spacing={5} direction='row'>
                          <Radio colorScheme='red' value='SELLER' onClick={onChangeRole}>
                            Seller
                          </Radio>
                          <Radio colorScheme='green' value='VENDOR' onClick={onChangeRole}>
                            Vendor
                          </Radio>
                        </Stack>
                      </RadioGroup>
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
                        onClick={onSingup}
                      >
                        CONTINUE
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
                      Already have account
                      <ChakraLink
                        fontWeight={"bold"}
                        _hover={{ textDecoration: "none" }}
                        color={"#ff3f6c"}
                        to
                      >
                        <Link to={`/signin`} >
                          <span>&nbsp;Signin</span>
                        </Link>
                      </ChakraLink>
                    </Text>
                  </Box>
                </VStack>

                {/* <Box w={"50%"}  margin="auto">  <Input w={"100%"} mt={"3%"} type="number" placeholder='Enter Mobile Number' value={ph} onChange={(e)=>setph(e.target.value)} />
      <Button   color="white" bg={"#721f1f"} w={"100%"} mt={"3%"} onClick={onSingup}>Send otp</Button> </Box> */}
              </Center>
            ) : (
              <Box style={{ width: "50%", margin: "auto", marginTop: "5%" }}>





                <Box>


                  <Center w={"full"} bgColor="#fceeea" h={"100vh"}>


                    <Box bgColor="white" w={"400px"} p="50px">
                      <Box>
                        <Image
                          size="50px"
                          boxSize={"100px"}
                          src="https://constant.myntassets.com/pwa/assets/img/3a438cb4-c9bf-4316-b60c-c63e40a1a96d1548071106233-mobile-verification.jpg"
                        />
                      </Box>

                      <Box textAlign={"left"} mt={2} mb={2}>
                        <Heading
                          fontWeight={"600"}
                          as={"h2"}
                          color="#424553"
                          fontSize="20px"
                          size="lg"
                        >
                          Verify with OTP
                        </Heading>
                        <Text fontSize={"12px"} mt={2} color={"#a7a9af"}>
                          Send to
                        </Text>
                      </Box>

                      <HStack m={"40px 0px 25px 0px"}>


                        <OtpInput
                          value={otp}
                          onChange={setotp}
                          OTPLength={6}
                          otpType="number"
                          disabled={false}
                          color="#333"
                          inputStyles={{
                            border: "1px solid black",
                            width: "100%",
                            marginBottom: "3%",
                          }}
                          autofocus
                        ></OtpInput>
                      </HStack>
                      <Button
                        w={"100%"}
                        color="white"
                        bg={"#ff406c"}
                        // onClick={}
                      >
                        Verify
                      </Button>



                      <Box mb={8}>
                        <Text
                          textAlign={"left"}
                          color={"#ff3f6c"}
                          fontWeight="bold"
                          fontSize={"12px"}
                          cursor={"pointer"}
                        // onClick={onOtpVerify}
                        >
                          RESEND OTP
                        </Text>
                      </Box>

                      <Text color={"#a7a9af"} fontSize="12px" textAlign="left">
                        Log in using{" "}
                        <ChakraLink
                          fontWeight={"bold"}
                          _hover={{ textDecoration: "none" }}
                          color={"#ff3f6c"}
                          href="#"
                        >
                          Password
                        </ChakraLink>
                      </Text>

                      <Text mt={8} color={"#a7a9af"} fontSize="12px" textAlign="left">
                        Having trouble logging in?{" "}
                        <ChakraLink
                          fontWeight={"bold"}
                          _hover={{ textDecoration: "none" }}
                          color={"#ff3f6c"}
                          href="#"
                        >
                          Get help
                        </ChakraLink>
                      </Text>
                    </Box>

                  </Center>

                </Box>


              </Box>


            )}
          </Box>
        }
      </div>
    </>
  );
};

export default Signup;