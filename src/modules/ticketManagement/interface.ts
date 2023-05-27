export interface FamilyTicket {
  bookingCode: string;
  ticketNumber: string;
  usageStatus: string;
  usedDate: string;
  releasedDate: string;
  gate: string | null;
}

export interface EventTicket {
  bookingCode: string;
  ticketNumber: string;
  nameEvent: string;
  usageStatus: string;
  usedDate: string | null;
  releasedDate: string;
  gate: string | null;
}
