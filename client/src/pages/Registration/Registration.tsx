

import React, { ChangeEvent, useState, FormEvent } from "react";
import { fetchLogin, fetchReg } from "../../store/thunkActions/thunkActions";
import { useAppDispatch } from "../../hooks";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Input,
  Button,
  Text,
  FormControl,
  Center,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export default function Registration() {
  const [input, setInput] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    isAdmin: false,
  });
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const submitHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const normalizedPhone = normalizePhoneNumber(input.phone);
    if (!normalizedPhone) {
      setErrMsg("Введите корректный номер телефона");
      onOpen();
      return;
    }

    try {
      const resultAction = await dispatch(
        fetchReg({ ...input, phone: normalizedPhone, isAdmin: false })
      );

      if (fetchReg.fulfilled.match(resultAction)) {
        if (resultAction.payload.regErr) {
          setErrMsg(resultAction.payload.regErr);
          onOpen();
        }
        if (resultAction.payload.regDone) {
          const loginResult = await dispatch(
            fetchLogin({ login: input.username, password: input.password })
          ).unwrap();

          if (loginResult) {
            localStorage.setItem(
              "username",
              resultAction.payload.username || ""
            );
            setInput({
              username: "",
              email: "",
              phone: "",
              password: "",
              isAdmin: false,
            });
            navigate("/");
          }
        }
      } else {
        console.log(resultAction.payload);
        setErrMsg(
          "Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз."
        );
        onOpen();
      }
    } catch (error) {
      console.log(error);
      setErrMsg(
        "Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз."
      );
      onOpen();
    }
  };
  return (
    <>
      <Center height="100vh">
        <Box
          as="form"
          onSubmit={submitHandler}
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={5}
          borderRadius="md"
          boxShadow="0 0 10px rgba(50, 205, 50, 0.5)"
          width="300px"
        >
          <FormControl id="usernameInput" isRequired mb={3}>
            <Input
              placeholder="Придумайте логин"
              onChange={changeHandler}
              value={input.username}
              name="username"
              type="text"
              p={2}
              border="2px solid"
              borderColor="gray.600"
              borderRadius="md"
              color="black"
              _focus={{
                borderColor: "green.400",
                boxShadow: "0 0 10px rgba(50, 205, 50, 0.5)",
              }}
              _hover={{ borderColor: "green.400" }}
              _placeholder={{ color: "gray.400", fontStyle: "italic" }}
            />
          </FormControl>
          <FormControl id="emailInput" mb={3}>
            <Input
              placeholder="Введите EMAIL (обязательно)"
              onChange={changeHandler}
              value={input.email}
              name="email"
              type="email"
              p={2}
              border="2px solid"
              borderColor="gray.600"
              borderRadius="md"
              color="black"
              _focus={{
                borderColor: "green.400",
                boxShadow: "0 0 10px rgba(50, 205, 50, 0.5)",
              }}
              _hover={{ borderColor: "green.400" }}
              _placeholder={{ color: "gray.400", fontStyle: "italic" }}
            />
          </FormControl>
          <FormControl id="phoneInput" isRequired mb={3}>
            <Input
              placeholder="Введите номер телефона"
              onChange={changeHandler}
              value={input.phone}
              name="phone"
              type="text"
              p={2}
              border="2px solid"
              borderColor="gray.600"
              borderRadius="md"
              color="black"
              _focus={{
                borderColor: "green.400",
                boxShadow: "0 0 10px rgba(50, 205, 50, 0.5)",
              }}
              _hover={{ borderColor: "green.400" }}
              _placeholder={{ color: "gray.400", fontStyle: "italic" }}
            />
          </FormControl>
          <FormControl id="passwordInput" isRequired mb={3}>
            <Input
              placeholder="Придумайте пароль"
              onChange={changeHandler}
              value={input.password}
              name="password"
              type="password"
              p={2}
              border="2px solid"
              borderColor="gray.600"
              borderRadius="md"
              color="black"
              _focus={{
                borderColor: "green.400",
                boxShadow: "0 0 10px rgba(50, 205, 50, 0.5)",
              }}
              _hover={{ borderColor: "green.400" }}
              _placeholder={{ color: "gray.400", fontStyle: "italic" }}
            />
          </FormControl>
          <Button
            marginTop="30px"
            type="submit"
            bg="green.400"
            color="white"
            border="2px solid"
            borderColor="green.400"
            borderRadius="md"
            p={2}
            cursor="pointer"
            _hover={{
              bg: "white",
              color: "green.400",
              boxShadow: "0 0 10px rgba(50, 205, 50, 0.5)",
            }}
            _active={{ bg: "green.400", color: "white" }}
          >
            Отправить
          </Button>
        </Box>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ошибка</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{errMsg}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              ОК
              </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}