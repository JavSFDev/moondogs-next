import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  walletModal: false,
  bidsModal: false,
  buyModal: false,
  propertiesModalValue: false,
};

export const modalSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    walletModalShow: (state) => {
      state.walletModal = true;
    },
    walletModalHide: (state) => {
      state.walletModal = false;
    },
    bidsModalShow: (state) => {
      state.bidsModal = true;
    },
    bidsModalHide: (state) => {
      state.bidsModal = false;
    },
    buyModalShow: (state) => {
      state.buyModal = true;
    },
    buyModalHide: (state) => {
      state.buyModal = false;
    },
    showPropertiesModal: (state) => {
      state.propertiesModalValue = true;
    },
    closePropertiesModal: (state) => {
      state.propertiesModalValue = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  walletModalShow,
  walletModalHide,
  bidsModalShow,
  bidsModalHide,
  buyModalShow,
  buyModalHide,
  showPropertiesModal,
  closePropertiesModal,
} = modalSlice.actions;

export default modalSlice.reducer;
