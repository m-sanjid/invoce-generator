import { InvoiceEditor } from "@/components/invoice-editor"

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Invoice Management System</h1>
      <InvoiceEditor />
    </div>
  )
}
