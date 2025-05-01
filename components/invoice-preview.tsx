import {
  formatDate,
  calculateSubtotal,
  calculateTax,
  calculateDiscount,
  calculateTotal,
  formatCurrency,
} from "@/lib/utils"
import type { Invoice } from "@/lib/types"

interface InvoicePreviewProps {
  invoice: Invoice
}

export function InvoicePreview({ invoice }: InvoicePreviewProps) {
  const subtotal = calculateSubtotal(invoice.lineItems)
  const tax = calculateTax(subtotal, invoice.taxRate)
  const discount = calculateDiscount(subtotal, invoice.discountRate)
  const total = calculateTotal(subtotal, tax, discount)

  return (
    <div className="p-8 max-w-[210mm] mx-auto bg-white text-black">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{invoice.companyName}</h1>
          <address className="not-italic mt-2 text-sm whitespace-pre-line">
            {invoice.companyAddress}
            <br />
            {invoice.companyEmail}
            <br />
            {invoice.companyPhone}
          </address>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold">INVOICE</h2>
          <p className="mt-1 text-sm text-gray-600">#{invoice.id}</p>
          <div className="mt-2 inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            {invoice.status}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-8">
        <div>
          <h3 className="font-medium text-gray-600">Bill To:</h3>
          <div className="mt-2">
            <p className="font-medium">{invoice.clientName || "Client Name"}</p>
            <address className="not-italic mt-1 text-sm whitespace-pre-line">
              {invoice.clientAddress || "Client Address"}
              <br />
              {invoice.clientEmail || "client@example.com"}
            </address>
          </div>
        </div>
        <div className="text-right">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p className="text-gray-600">Invoice Date:</p>
            <p>{formatDate(invoice.invoiceDate)}</p>
            <p className="text-gray-600">Due Date:</p>
            <p>{formatDate(invoice.dueDate)}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2 text-left font-medium text-gray-600">Description</th>
              <th className="py-2 text-right font-medium text-gray-600">Quantity</th>
              <th className="py-2 text-right font-medium text-gray-600">Rate</th>
              <th className="py-2 text-right font-medium text-gray-600">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.lineItems.map((item) => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="py-3">{item.description || "Item description"}</td>
                <td className="py-3 text-right">{item.quantity}</td>
                <td className="py-3 text-right">{formatCurrency(item.rate, invoice.currency)}</td>
                <td className="py-3 text-right">{formatCurrency(item.amount, invoice.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <div className="w-64">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p className="text-gray-600">Subtotal:</p>
            <p className="text-right">{formatCurrency(subtotal, invoice.currency)}</p>

            <p className="text-gray-600">Tax ({invoice.taxRate}%):</p>
            <p className="text-right">{formatCurrency(tax, invoice.currency)}</p>

            <p className="text-gray-600">Discount ({invoice.discountRate}%):</p>
            <p className="text-right">-{formatCurrency(discount, invoice.currency)}</p>

            <p className="text-base font-bold">Total:</p>
            <p className="text-right text-base font-bold">{formatCurrency(total, invoice.currency)}</p>
          </div>
        </div>
      </div>

      {invoice.notes && (
        <div className="mt-8 border-t border-gray-200 pt-4">
          <h3 className="font-medium text-gray-600">Notes:</h3>
          <p className="mt-1 text-sm whitespace-pre-line">{invoice.notes}</p>
        </div>
      )}

      <div className="mt-8 text-center text-sm text-gray-500">Thank you for your business!</div>
    </div>
  )
}
