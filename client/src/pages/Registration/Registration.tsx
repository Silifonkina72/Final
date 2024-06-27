import React, { ChangeEvent, useState, FormEvent } from "react";
import { fetchLogin, fetchReg } from "../../store/thunkActions/thunkActions";
import { useAppDispatch } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { Box, Input, Button, Text, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";

export default function Registration() {
  const [input, setInput] = useState({ login: "", password: "", email: "", phone: "", isAdmin: false });
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const normalizePhoneNumber = (number: string): string | false => {
    const phoneRegex = /^(\+7|8)\D?\d{3}\D?\d{3}\D?\d{2}\D?\d{2}$/;
    if (!phoneRegex.test(number)) {
      return false;
    }
    number = number.replace(/[()\s-]/g, "");
    if (number.startsWith("8")) {
      number = number.replace(/^8/, "+7");
    }
    if (number.startsWith("+7")) {
      return number;
    }
    return false;
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const normalizedPhone = normalizePhoneNumber(input.phone);
    if (!normalizedPhone) {
      setErrMsg('Input correct your phone number');
      return;
    }

    try {
      const resultAction = await dispatch(fetchReg({ ...input, phone: normalizedPhone , isAdmin: false}));

      if (fetchReg.fulfilled.match(resultAction)) {
        if (resultAction.payload.regErr) {
          setErrMsg(resultAction.payload.regErr);
        }
        if (resultAction.payload.regDone) {
          const loginResult = await dispatch(fetchLogin({ login: input.login, password: input.password })).unwrap();

          if (loginResult) {
            localStorage.setItem("login", resultAction.payload.login || "");
            setInput({ login: "", email: "", phone: "", password: "", isAdmin: false });
            navigate("/");
          }
        }
      } else {
        console.log(resultAction.payload);
        setErrMsg("Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз.");
      }
    } catch (error) {
      console.log(error);
      setErrMsg("Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз.");
    }
  };

  return (
    <Box
    marginTop="100" 
      as="form"
      onSubmit={submitHandler}
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={5}
      borderRadius="md"
      boxShadow="0 0 10px rgba(50, 205, 50, 0.5)"
      // height="100vh"
    >
      {errMsg && <Text color="red.500" fontWeight="bold" mb={3}>{errMsg}</Text>}
      <FormControl id="exampleInputLogin1" isRequired mb={3}>
        <Input
          placeholder="Придумай login"
          onChange={changeHandler}
          value={input.login}
          name="login"
          type="text"
          width="300px"
          p={2}
          border="2px solid"
          borderColor="gray.600"
          borderRadius="md"
          color="black"
          _focus={{ borderColor: "green.400", boxShadow: "0 0 10px rgba(50, 205, 50, 0.5)" }}
          _hover={{ borderColor: "green.400" }}
          _placeholder={{ color: "gray.400", fontStyle: "italic" }}
        />
      </FormControl>
      <FormControl id="exampleInputEmail1" mb={3}>
        <Input
          placeholder="введите EMAIL (обязательно)"
          onChange={changeHandler}
          value={input.email}
          name="email"
          type="email"
          width="300px"
          p={2}
          border="2px solid"
          borderColor="gray.600"
          borderRadius="md"
          color="black"
          _focus={{ borderColor: "green.400", boxShadow: "0 0 10px rgba(50, 205, 50, 0.5)" }}
          _hover={{ borderColor: "green.400" }}
          _placeholder={{ color: "gray.400", fontStyle: "italic" }}
        />
      </FormControl>
      <FormControl id="exampleInputPhone1" isRequired mb={3}>
        <Input
          placeholder="введите номер телефона"
          onChange={changeHandler}
          value={input.phone}
          name="phone"
          type="text"
          width="300px"
          p={2}
          border="2px solid"
          borderColor="gray.600"
          borderRadius="md"
          color="black"
          _focus={{ borderColor: "green.400", boxShadow: "0 0 10px rgba(50, 205, 50, 0.5)" }}
          _hover={{ borderColor: "green.400" }}
          _placeholder={{ color: "gray.400", fontStyle: "italic" }}
        />
      </FormControl>
      <FormControl id="exampleInputPassword1" isRequired mb={3}>
        <Input
          placeholder="придумай password"
          onChange={changeHandler}
          value={input.password}
          name="password"
          type="password"
          width="300px"
          p={2}
          border="2px solid"
          borderColor="gray.600"
          borderRadius="md"
          color="black"
          _focus={{ borderColor: "green.400", boxShadow: "0 0 10px rgba(50, 205, 50, 0.5)" }}
          _hover={{ borderColor: "green.400" }}
          _placeholder={{ color: "gray.400", fontStyle: "italic" }}
        />
      </FormControl>
      <Button
      marginTop="30px" 
        type="submit"
        width="300px"
        bg="green.400"
        color="white"
        border="2px solid"
        borderColor="green.400"
        borderRadius="md"
        p={2}
        cursor="pointer"
        _hover={{ bg: "white", color: "green.400", boxShadow: "0 0 10px rgba(50, 205, 50, 0.5)" }}
        _active={{ bg: "green.400", color: "white" }}
      >
        Отправить
      </Button>
    </Box>
  );
}



