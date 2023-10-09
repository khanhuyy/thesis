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
import { Toaster, toast } from "react-hot-toast";
// import Swal from "sweetalert2";
import { async } from "@firebase/util";

export const Signin = () => {
  const [isAuth,setAuth] = useState(false)
  const [ph, setph] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setuser] = useState("");
  const [otp, setotp] = useState("");
  const [change, setchnage] = useState(true);
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

  const onSingup = () => {
    // onCatchVerify();
    // setchange2(!change2);
    // const appVerifier = window.recaptchaVerifier;

    // const phoneformat = "+84" + ph;

    // signInWithPhoneNumber(auth, phoneformat, appVerifier)
    //   .then((confirmationResult) => {
    //     window.confirmationResult = confirmationResult;

    //     toast.success("Otp Send Successfully");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    signInWithEmailAndPassword(auth, email, password)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;

        toast.success("Otp Send Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
    ;
  };
  const wrongalert = async () => {
    toast({
      position: 'top',
      title: `Wrong OTP entered`,
      status: "error",
      isClosable: true,
      duration: 1500,
    })
  };

  function onSisnIn() {
    window.confirmationResult
      .confirm(otp)
      .then(async (result) => {
        setuser(result.user);
        toast({
          position: 'top',
          title: `Login successful`,
          status: 'success',
          isClosable: true,
          duration: 1500,
        })
        // setAuth(true)
        localStorage.setItem("Login",JSON.stringify(true))
        navigate("/");
      })
      .catch((error) => {
        wrongalert();
      });
  }

  return(
    <form>
      <InputGroup mt={30} size={"sm"} variant={"outline"}>
        <Input
          p={"15px 10px"}
          focusBorderColor="#f4f4f4"
          maxLength={30}
          minLength={10}
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
          minLength={5}
          type="tel"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputGroup>
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
      <Button w={"100%"}
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
    </form>
  )
};

export default Signin;