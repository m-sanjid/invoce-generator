"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { InvoicePreview } from "@/components/invoice-preview"
import { SendInvoiceModal } from "@/components/send-invoice-modal"
import { useToast } from "@/hooks/use-toast"
import type { Invoice } from "@/lib/types"
import { ArrowLeft, Download, Mail, Printer, Copy } from "lucide-react"
import Link from "next/link"

// Sample data - in a real app, this would come from an API or database
const sampleInvoice: Invoice = {
  id: "INV-2023-1001",
  clientName: "Acme Corp",
  clientEmail: "billing@acmecorp.com",
  clientAddress: "123 Business Ave\nSuite 100\nMetropolis, CA 90210",
  companyName: "Your Company",
  companyAddress: "456 Commerce St\nEnterprise, CA 90211",
  companyEmail: "contact@yourcompany.com",
  companyPhone: "+1 (555) 123-4567",
  invoiceDate: "2023-05-15",
  dueDate: "2023-06-15",
  currency: "USD",
  taxRate: 8.5,
  discountRate: 5,
  lineItems: [
    {
      id: "1",
      description: "Website Development",
      quantity: 1,
      rate: 1200,
      amount: 1200,
    },
    {
      id: "2",
      description: "Hosting (Annual)",
      quantity: 1,
      rate: 120,
      amount: 120,
    },
  ],
  notes: "Payment due within 30 days. Please make checks payable to Your Company or pay online at yourcompany.com/pay",
  status: "Paid",
}

interface InvoiceDetailsProps {
  id: string
}

export function InvoiceDetails({ id }: InvoiceDetailsProps) {
  const { toast } = useToast()
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [showSendModal, setShowSendModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setInvoice(sampleInvoice)
      setLoading(false)
    }, 500)
  }, [id])

  const handlePrintInvoice = () => {
    window.print()
  }

  const handleDownloadPDF = () => {
    toast({
      title: "PDF generated",
      description: "Your invoice PDF is downloading",
    })
  }

  const handleDuplicateInvoice = () => {
    toast({
      title: "Invoice duplicated",
      description: "A new draft invoice has been created",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4">Loading invoice...</p>
        </div>
      </div>
    )
  }

  if (!invoice) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Invoice Not Found</h2>
        <p className="mb-6">The invoice you're looking for doesn't exist or has been deleted.</p>
        <Button asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrintInvoice}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowSendModal(true)}>
            <Mail className="h-4 w-4 mr-2" />
            Send
          </Button>
          <Button variant="outline" size="sm" onClick={handleDuplicateInvoice}>
            <Copy className="h-4 w-4 mr-2" />
            Duplicate
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden bg-white print:shadow-none">
        <InvoicePreview invoice={invoice} />
      </Card>

      <SendInvoiceModal
        open={showSendModal}
        onOpenChange={setShowSendModal}
        invoice={invoice}
        onSend={(email, message) => {
          toast({
            title: "Invoice sent",
            description: `Invoice sent to ${email}`,
          })
          setShowSendModal(false)
        }}
      />
    </div>
  )
}
