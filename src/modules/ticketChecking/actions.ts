import db from "../../config/firebase";
import { AppThunk } from "../../core/store/redux";
import { TicketChecking } from "./interface";
import {
  fetchTicketCheckingSuccess,
  setFailure,
  setStart,
  updateCheckedSuccess,
} from "./ticketCheckingStore";

// TODO: LIST
export const fetchTickets = (): AppThunk => async (dispatch) => {
  dispatch(setStart());
  try {
    const ticketsData = await db.firestore().collection("ticketChecking").get();
    const tickets = ticketsData.docs.map((doc) => doc.data() as TicketChecking);
    dispatch(fetchTicketCheckingSuccess(tickets));
  } catch (error) {
    console.log(error);
    dispatch(setFailure((error as Error).message));
  }
};

// TODO: CHECKING
export const updateChecked = (): AppThunk => async (dispatch) => {
  dispatch(setStart());
  try {
    const snapshot = await db.firestore().collection("ticketChecking").get();
    const batch = db.firestore().batch();

    snapshot.forEach((doc) => {
      const ticketRef = db.firestore().collection("ticketChecking").doc(doc.id);
      batch.update(ticketRef, { checked: true });
    });

    await batch.commit();

    const updatedTicketsData = await db
      .firestore()
      .collection("ticketChecking")
      .get();

    const updatedTickets: TicketChecking[] = [];
    updatedTicketsData.forEach((doc) => {
      updatedTickets.push(doc.data() as TicketChecking);
    });
    dispatch(updateCheckedSuccess(updatedTickets));
  } catch (error) {
    console.error(error);
    dispatch(setFailure((error as Error).message));
  }
};
