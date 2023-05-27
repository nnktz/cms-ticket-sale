import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TicketPackage } from "./interface";

interface TicketPackageState {
  ticketPackages: TicketPackage[];
  loading: boolean;
  error: string | null;
}

const initialState: TicketPackageState = {
  ticketPackages: [],
  loading: false,
  error: null,
};

const ticketPackageStore = createSlice({
  name: "ticketPackage",
  initialState,
  reducers: {
    setStart(state) {
      state.loading = true;
      state.error = null;
    },
    setFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchTicketPackagesSuccess(state, action: PayloadAction<TicketPackage[]>) {
      state.loading = false;
      state.ticketPackages = action.payload;
    },
    addTicketPackageSuccess(state, action: PayloadAction<TicketPackage>) {
      state.loading = false;
      state.ticketPackages.push(action.payload);
    },
    updateTicketPackageSuccess(state, action: PayloadAction<TicketPackage>) {
      const updatedTicketPackage = action.payload;
      const index = state.ticketPackages.findIndex(
        (tp) => tp.packageCode === updatedTicketPackage.packageCode
      );
      if (index !== -1) {
        state.ticketPackages[index] = updatedTicketPackage;
      }
      state.loading = false;
    },
    deleteTicketPackageSuccess(state, action: PayloadAction<string>) {
      const ticketPackageId = action.payload;
      state.ticketPackages = state.ticketPackages.filter(
        (tp) => tp.packageCode !== ticketPackageId
      );
      state.loading = false;
    },
  },
});

export const {
  setStart,
  setFailure,
  fetchTicketPackagesSuccess,
  addTicketPackageSuccess,
  updateTicketPackageSuccess,
  deleteTicketPackageSuccess,
} = ticketPackageStore.actions;

export default ticketPackageStore;
