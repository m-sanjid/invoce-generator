"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Invoice } from "@/lib/types"

interface SendInvoiceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  invoice: Invoice
  onSend: (email: string, message: string) => void
}

export function SendInvoiceModal({ open, onOpenChange, invoice, onSend }: SendInvoiceModalProps) {
  const [email, setEmail] = useState(invoice.clientEmail || "")
  const [message, setMessage] = useState(
    `Dear ${invoice.clientName},\n\nPlease find attached invoice #${invoice.id} for your recent services.\n\nThank you for your business.\n\nBest regards,\n${invoice.companyName}`,
  )

  const handleSend = () => {
    onSend(email, message)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Send Invoice</DialogTitle>
          <DialogDescription>Send this invoice directly to your client via email.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Email</Label>
            <Input
              id="recipient"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" value={`Invoice #${invoice.id} from ${invoice.companyName}`} readOnly />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="h-32 resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSend}>Send & Mark as Sent</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
