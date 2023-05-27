import { combineReducers } from "@reduxjs/toolkit";
import ticketPackageStore from "./ticketPackages/ticketPackageStore";
import ticketManagementStore from "./ticketManagement/ticketManagementStore";
import ticketCheckingStore from "./ticketChecking/ticketCheckingStore";

const appReducer = combineReducers({
  ticketPackage: ticketPackageStore.reducer,
  ticketManagement: ticketManagementStore.reducer,
  ticketChecking: ticketCheckingStore.reducer,
});

export type RootState = ReturnType<typeof appReducer>;
export default appReducer;
