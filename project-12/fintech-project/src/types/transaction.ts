export type TransactionType = "expense" | "income";

export interface Transaction {
  id?: string;
  type: TransactionType;
  category: string;
  amount: number;
  date: string; // ISO date
  flatNo?: string;
  month?: string; // format: YYYY-MM
  notes?: string;
}
