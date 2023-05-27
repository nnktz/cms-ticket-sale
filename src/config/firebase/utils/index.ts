import db from "..";

export const toFirebaseTimestamp = (date: Date) => {
  return date ? db.firestore.Timestamp.fromDate(date) : null;
};
