import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EventTicket, FamilyTicket } from "./interface";

interface TicketManagementState {
  familyTickets: FamilyTicket[];
  eventTickets: EventTicket[];
  loading: boolean;
  error: string | null;
}

const initialState: TicketManagementState = {
  familyTickets: [],
  eventTickets: [],
  loading: false,
  error: null,
};

const ticketManagementStore = createSlice({
  name: "ticketManagement",
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
    fetchFamilyTicketsSuccess(state, action: PayloadAction<FamilyTicket[]>) {
      state.loading = false;
      state.familyTickets = action.payload;
    },
    fetchEventTicketsSuccess(state, action: PayloadAction<EventTicket[]>) {
      state.loading = false;
      state.eventTickets = action.payload;
    },
    updateFamilyTicketSuccess(state, action: PayloadAction<FamilyTicket>) {
      const updatedTicket = action.payload;
      const index = state.familyTickets.findIndex(
        (tp) => tp.bookingCode === updatedTicket.bookingCode
      );
      if (index !== -1) {
        state.familyTickets[index] = updatedTicket;
      }
      state.loading = false;
    },
    updateEventTicketSuccess(state, action: PayloadAction<EventTicket>) {
      const updatedTicket = action.payload;
      const index = state.eventTickets.findIndex(
        (tp) => tp.bookingCode === updatedTicket.bookingCode
      );
      if (index !== -1) {
        state.eventTickets[index] = updatedTicket;
      }
      state.loading = false;
    },
  },
});

export const {
  setStart,
  setFailure,
  fetchFamilyTicketsSuccess,
  fetchEventTicketsSuccess,
  updateFamilyTicketSuccess,
  updateEventTicketSuccess,
} = ticketManagementStore.actions;

export default ticketManagementStore;
