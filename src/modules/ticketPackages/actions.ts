import db from "../../config/firebase";
import { TicketPackage } from "./interface";
import {
  addTicketPackageSuccess,
  fetchTicketPackagesSuccess,
  setFailure,
  setStart,
  updateTicketPackageSuccess,
} from "./ticketPackageStore";
import { AppThunk } from "../../core/store/redux";
import dayjs from "dayjs";

// TODO: LIST
export const fetchTicketPackages = (): AppThunk => async (dispatch) => {
  dispatch(setStart());
  try {
    const ticketPackagesData = await db
      .firestore()
      .collection("ticketPackages")
      .get();
    const ticketPackages = ticketPackagesData.docs.map(
      (doc) => doc.data() as TicketPackage
    );
    dispatch(fetchTicketPackagesSuccess(ticketPackages));
  } catch (error) {
    console.log(error);
    dispatch(setFailure((error as Error).message));
  }
};

// TODO: ADD
export const addTicketPackage =
  (data: Omit<TicketPackage, "packageCode" | "createAt">): AppThunk =>
  async (dispatch) => {
    dispatch(setStart());
    try {
      const batch = db.firestore().batch();
      const newTicketPackageRef = db
        .firestore()
        .collection("ticketPackages")
        .doc();
      const newTicketPackageData: TicketPackage = {
        packageCode: newTicketPackageRef.id,
        ...data,
        createAt: dayjs().toString(),
      };
      batch.set(newTicketPackageRef, newTicketPackageData);
      await batch.commit();
      dispatch(addTicketPackageSuccess(newTicketPackageData));
    } catch (error) {
      console.error(error);
      dispatch(setFailure((error as Error).message));
    }
  };

// TODO: UPDATE
export const updateTicketPackage =
  (id: string, data: Partial<Omit<TicketPackage, "createAt">>): AppThunk =>
  async (dispatch) => {
    dispatch(setStart());
    try {
      await db.firestore().collection("ticketPackages").doc(id).update(data);
      const updatedTicketPackageData = await db
        .firestore()
        .collection("ticketPackages")
        .doc(id)
        .get();
      const updatedTicketPackage =
        updatedTicketPackageData.data() as TicketPackage;
      dispatch(updateTicketPackageSuccess(updatedTicketPackage));
    } catch (error) {
      console.error(error);
      dispatch(setFailure((error as Error).message));
    }
  };
