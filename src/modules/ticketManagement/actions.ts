import db from "../../config/firebase";
import { AppThunk } from "../../core/store/redux";
import { EventTicket, FamilyTicket } from "./interface";
import {
  fetchEventTicketsSuccess,
  fetchFamilyTicketsSuccess,
  setFailure,
  setStart,
  updateEventTicketSuccess,
  updateFamilyTicketSuccess,
} from "./ticketManagementStore";

// TODO: FAMILY TICKET LIST
export const fetchFamilyTickets = (): AppThunk => async (dispatch) => {
  dispatch(setStart());
  try {
    const familyTicketsData = await db
      .firestore()
      .collection("familyTickets")
      .get();
    const familyTickets = familyTicketsData.docs.map(
      (doc) => doc.data() as FamilyTicket
    );
    dispatch(fetchFamilyTicketsSuccess(familyTickets));
  } catch (error) {
    console.log(error);
    dispatch(setFailure((error as Error).message));
  }
};

// TODO: EVENT TICKET LIST
export const fetchEventTickets = (): AppThunk => async (dispatch) => {
  dispatch(setStart());
  try {
    const eventTicketsData = await db
      .firestore()
      .collection("eventTickets")
      .get();
    const eventTickets = eventTicketsData.docs.map(
      (doc) => doc.data() as EventTicket
    );
    dispatch(fetchEventTicketsSuccess(eventTickets));
  } catch (error) {
    console.log(error);
    dispatch(setFailure((error as Error).message));
  }
};

// TODO: UPDATE FAMILY TICKET
export const updateFamilyTicket =
  (
    id: string,
    data: Partial<{ usageStatus?: string; usedDate?: string }>
  ): AppThunk =>
  async (dispatch) => {
    dispatch(setStart());
    try {
      await db.firestore().collection("familyTickets").doc(id).update(data);
      const updatedFamilyTicketData = await db
        .firestore()
        .collection("familyTickets")
        .doc(id)
        .get();
      const updatedFamilyTicket =
        updatedFamilyTicketData.data() as FamilyTicket;
      dispatch(updateFamilyTicketSuccess(updatedFamilyTicket));
    } catch (error) {
      console.error(error);
      dispatch(setFailure((error as Error).message));
    }
  };

// TODO: UPDATE EVENT TICKET
export const updateEventTicket =
  (
    id: string,
    data: Partial<{ usageStatus?: string; usedDate?: string }>
  ): AppThunk =>
  async (dispatch) => {
    dispatch(setStart());
    try {
      await db.firestore().collection("eventTickets").doc(id).update(data);
      const updatedEventTicketData = await db
        .firestore()
        .collection("eventTickets")
        .doc(id)
        .get();
      const updatedEventTicket = updatedEventTicketData.data() as EventTicket;
      dispatch(updateEventTicketSuccess(updatedEventTicket));
    } catch (error) {
      console.error(error);
      dispatch(setFailure((error as Error).message));
    }
  };
