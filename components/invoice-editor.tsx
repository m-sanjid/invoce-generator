"use client"

import { useState } from "react"
import { InvoiceForm } from "@/components/invoice-form"
import { InvoicePreview } from "@/components/invoice-preview"
import { SendInvoiceModal } from "@/components/send-invoice-modal"
import { Button } from "@/components/ui/button"
import { Download, Mail, Printer, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Invoice, LineItem } from "@/lib/types"

export function InvoiceEditor() {
  const { toast } = useToast()
  const [showSendModal, setShowSendModal] = useState(false)
  const [invoice, setInvoice] = useState<Invoice>({
    id: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    companyName: "Your Company",
    companyAddress: "123 Business St, City, Country",
    companyEmail: "contact@yourcompany.com",
    companyPhone: "+1 (555) 123-4567",
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    currency: "USD",
    taxRate: 0,
    discountRate: 0,
    lineItems: [
      {
        id: "1",
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0,
      },
    ],
    notes: "Thank you for your business!",
    status: "Draft",
  })

  const handleUpdateInvoice = (updatedInvoice: Partial<Invoice>) => {
    setInvoice((prev) => ({ ...prev, ...updatedInvoice }))
  }

  const handleAddLineItem = () => {
    const newLineItem: LineItem = {
      id: `item-${invoice.lineItems.length + 1}`,
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    }

    setInvoice((prev) => ({
      ...prev,
      lineItems: [...prev.lineItems, newLineItem],
    }))
  }

  const handleRemoveLineItem = (id: string) => {
    if (invoice.lineItems.length <= 1) {
      toast({
        title: "Cannot remove",
        description: "Invoice must have at least one line item",
        variant: "destructive",
      })
      return
    }

    setInvoice((prev) => ({
      ...prev,
      lineItems: prev.lineItems.filter((item) => item.id !== id),
    }))
  }

  const handleUpdateLineItem = (id: string, updatedItem: Partial<LineItem>) => {
    setInvoice((prev) => ({
      ...prev,
      lineItems: prev.lineItems.map((item) => {
        if (item.id === id) {
          const updated = { ...item, ...updatedItem }
          // Recalculate amount
          updated.amount = updated.quantity * updated.rate
          return updated
        }
        return item
      }),
    }))
  }

  const handleSaveInvoice = () => {
    // In a real app, this would save to a database
    toast({
      title: "Invoice saved",
      description: "Your invoice has been saved as a draft",
    })
  }

  const handlePrintInvoice = () => {
    window.print()
  }

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    toast({
      title: "PDF generated",
      description: "Your invoice PDF is downloading",
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Invoice Details</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleSaveInvoice}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowSendModal(true)}>
              <Mail className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>

        <InvoiceForm
          invoice={invoice}
          onUpdateInvoice={handleUpdateInvoice}
          onAddLineItem={handleAddLineItem}
          onRemoveLineItem={handleRemoveLineItem}
          onUpdateLineItem={handleUpdateLineItem}
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Preview</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrintInvoice}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden bg-white print:border-none">
          <InvoicePreview invoice={invoice} />
        </div>
      </div>

      <SendInvoiceModal
        open={showSendModal}
        onOpenChange={setShowSendModal}
        invoice={invoice}
        onSend={(email, message) => {
          // In a real app, this would send the email
          toast({
            title: "Invoice sent",
            description: `Invoice sent to ${email}`,
          })
          setShowSendModal(false)
          setInvoice((prev) => ({ ...prev, status: "Sent" }))
        }}
      />
    </div>
  )
}
