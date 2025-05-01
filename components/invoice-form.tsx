"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { LineItemRow } from "@/components/line-item-row"
import { Plus } from "lucide-react"
import type { Invoice, LineItem } from "@/lib/types"
import { calculateSubtotal, calculateTax, calculateDiscount, calculateTotal, formatCurrency } from "@/lib/utils"

interface InvoiceFormProps {
  invoice: Invoice
  onUpdateInvoice: (invoice: Partial<Invoice>) => void
  onAddLineItem: () => void
  onRemoveLineItem: (id: string) => void
  onUpdateLineItem: (id: string, item: Partial<LineItem>) => void
}

export function InvoiceForm({
  invoice,
  onUpdateInvoice,
  onAddLineItem,
  onRemoveLineItem,
  onUpdateLineItem,
}: InvoiceFormProps) {
  const subtotal = calculateSubtotal(invoice.lineItems)
  const tax = calculateTax(subtotal, invoice.taxRate)
  const discount = calculateDiscount(subtotal, invoice.discountRate)
  const total = calculateTotal(subtotal, tax, discount)

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                value={invoice.clientName}
                onChange={(e) => onUpdateInvoice({ clientName: e.target.value })}
                placeholder="Client name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientEmail">Client Email</Label>
              <Input
                id="clientEmail"
                type="email"
                value={invoice.clientEmail}
                onChange={(e) => onUpdateInvoice({ clientEmail: e.target.value })}
                placeholder="client@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientAddress">Client Address</Label>
              <Textarea
                id="clientAddress"
                value={invoice.clientAddress}
                onChange={(e) => onUpdateInvoice({ clientAddress: e.target.value })}
                placeholder="Client address"
                className="resize-none h-20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyInfo">Company Info</Label>
              <Textarea
                id="companyInfo"
                value={invoice.companyAddress}
                onChange={(e) => onUpdateInvoice({ companyAddress: e.target.value })}
                placeholder="Your company address"
                className="resize-none h-20"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceDate">Invoice Date</Label>
              <Input
                id="invoiceDate"
                type="date"
                value={invoice.invoiceDate}
                onChange={(e) => onUpdateInvoice({ invoiceDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={invoice.dueDate}
                onChange={(e) => onUpdateInvoice({ dueDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={invoice.currency} onValueChange={(value) => onUpdateInvoice({ currency: value })}>
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                  <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Line Items</h3>
              <Button variant="outline" size="sm" onClick={onAddLineItem}>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground px-2">
                <div className="col-span-5">Description</div>
                <div className="col-span-2">Quantity</div>
                <div className="col-span-2">Rate</div>
                <div className="col-span-2">Amount</div>
                <div className="col-span-1"></div>
              </div>

              {invoice.lineItems.map((item) => (
                <LineItemRow
                  key={item.id}
                  item={item}
                  currency={invoice.currency}
                  onUpdate={(updatedItem) => onUpdateLineItem(item.id, updatedItem)}
                  onRemove={() => onRemoveLineItem(item.id)}
                />
              ))}
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  min="0"
                  max="100"
                  value={invoice.taxRate}
                  onChange={(e) => onUpdateInvoice({ taxRate: Number.parseFloat(e.target.value) || 0 })}
                  className="w-24 text-right"
                />
              </div>
              <div className="flex justify-between">
                <Label htmlFor="discountRate">Discount Rate (%)</Label>
                <Input
                  id="discountRate"
                  type="number"
                  min="0"
                  max="100"
                  value={invoice.discountRate}
                  onChange={(e) => onUpdateInvoice({ discountRate: Number.parseFloat(e.target.value) || 0 })}
                  className="w-24 text-right"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-1 text-right">
              <div className="flex justify-between">
                <span className="font-medium">Subtotal:</span>
                <span>{formatCurrency(subtotal, invoice.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Tax ({invoice.taxRate}%):</span>
                <span>{formatCurrency(tax, invoice.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Discount ({invoice.discountRate}%):</span>
                <span>-{formatCurrency(discount, invoice.currency)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>{formatCurrency(total, invoice.currency)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={invoice.notes}
              onChange={(e) => onUpdateInvoice({ notes: e.target.value })}
              placeholder="Additional notes or payment instructions"
              className="resize-none h-20"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
