export interface LineItem {
  id: string
  description: string
  quantity: number
  rate: number
  amount: number
}

export interface Invoice {
  id: string
  clientName: string
  clientEmail: string
  clientAddress: string
  companyName: string
  companyAddress: string
  companyEmail: string
  companyPhone: string
  invoiceDate: string
  dueDate: string
  currency: string
  taxRate: number
  discountRate: number
  lineItems: LineItem[]
  notes: string
  status: "Draft" | "Sent" | "Paid" | "Overdue"
}
