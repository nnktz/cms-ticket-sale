export interface TicketPackage {
  packageCode: string;
  packageName: string;
  applicableDate: string;
  expiredDate: string;
  price: string | null;
  comboPrice: string | null;
  comboTicketNumber: number | null;
  status: string;
  createAt: string;
}
