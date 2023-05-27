import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TicketChecking } from "./interface";

interface TicketCheckingState {
  tickets: TicketChecking[];
  loading: boolean;
  error: string | null;
}

const initialState: TicketCheckingState = {
  tickets: [],
  loading: false,
  error: null,
};

const ticketCheckingStore = createSlice({
  name: "ticketChecking",
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
    fetchTicketCheckingSuccess(state, action: PayloadAction<TicketChecking[]>) {
      state.loading = false;
      state.tickets = action.payload;
    },
    updateCheckedSuccess(state, action: PayloadAction<TicketChecking[]>) {
      const updatedTickets = action.payload;

      updatedTickets.forEach((updatedTicket) => {
        const index = state.tickets.findIndex(
          (tp) => tp.ticketNumber === updatedTicket.ticketNumber
        );

        if (index !== -1) {
          state.tickets[index] = updatedTicket;
        }
      });

      state.loading = false;
    },
  },
});

export const {
  setStart,
  setFailure,
  fetchTicketCheckingSuccess,
  updateCheckedSuccess,
} = ticketCheckingStore.actions;

export default ticketCheckingStore;
