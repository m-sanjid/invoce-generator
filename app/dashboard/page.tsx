import { InvoiceList } from "@/components/invoice-list"

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Invoice Dashboard</h1>
      <InvoiceList />
    </div>
  )
}
