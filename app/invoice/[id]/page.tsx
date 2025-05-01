import { InvoiceDetails } from "@/components/invoice-details"

interface InvoiceDetailsPageProps {
  params: {
    id: string
  }
}

export default function InvoiceDetailsPage({ params }: InvoiceDetailsPageProps) {
  return (
    <div className="container mx-auto py-8">
      <InvoiceDetails id={params.id} />
    </div>
  )
}
