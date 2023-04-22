import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signMessage } from "@wagmi/core";
import { toast } from "react-toastify";
import { APIServer } from "../utils/api";

const initialState = {
  user: [],
};

export const getUser = createAsyncThunk(
  "user/get",
  async (address: string, { rejectWithValue }) => {
    try {
      const result = await APIServer.get("/user", { params: { address } });
      return result.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return rejectWithValue("");
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (updateUserData: UserUpdateData, { rejectWithValue }) => {
    try {
      const signature = await signMessage({ message: updateUserData.address });
      const result = await APIServer.put(
        "/user",
        { ...updateUserData },
        { params: { address: updateUserData.address, signature } }
      );
      toast.success("Successfully updated!");
      return result.data;
    } catch (error: any) {
      toast.error(
        error.name === "AxiosError"
          ? error.response.data.message
          : error.message
      );
      return rejectWithValue("");
    }
  }
);

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUserDefault: (state) => {
      state.user = initialState.user;
      return state;
    },
  },
  extraReducers(builder) {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});
// Action creators are generated for each case reducer function
export const { setUserDefault } = userSlice.actions;

export default userSlice.reducer;
