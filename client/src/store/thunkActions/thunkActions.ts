/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { AxiosResponse } from "axios";
import type { IInputData } from "../../types/registrationTypes";

export const fetchReg = createAsyncThunk(
  "reg/fetchReg",
  async (inputs: IInputData) => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post<IInputData, AxiosResponse<any>>(
        "http://localhost:3000/registration",
        inputs,
        {withCredentials: true}
      );
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      console.log("Ошибка регистрации in Thanks", error);
    }
  }
);

export const fetchLogOut = createAsyncThunk("logout/fetchLogOut", async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.get("http://localhost:3000/logout");

    return response.data;
  } catch (error) {
    throw error;
    // console.log('Ошибка logout', error);
  }
});

export const fetchLogin = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        credentials,
        {
          withCredentials: true,
        }
      );
      console.log('=======>>>>>', response);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchGetLogin = createAsyncThunk("login/getLogin", async () => {
  axios.defaults.withCredentials = true;
  const response = await axios.get("http://localhost:3000/login");
  return response.data;
});
