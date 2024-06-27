import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { AxiosResponse } from "axios";

export const orderThunk = createAsyncThunk(
    "updateFetch",
    async (id) => {
      try {

        const response = await axios.patch(
            `http://localhost:3000/orders/${id}`,
        );
        return response.data;
      } catch (error) {
        console.log("Ошибка регистрации in Thanks", error);
      }
    }
  );


  // export const orderAllThunk = createAsyncThunk(
  //   "updateFetch",
  //   async () => {
  //     try {

  //       const response = await axios.patch(
  //           `http://localhost:3000/orders`,
  //       );
  //       return response.data;
  //     } catch (error) {
  //       console.log("Ошибка регистрации in Thanks", error);
  //     }
  //   }
  // );