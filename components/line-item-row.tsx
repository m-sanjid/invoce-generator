"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import type { LineItem } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"

interface LineItemRowProps {
  item: LineItem
  currency: string
  onUpdate: (item: Partial<LineItem>) => void
  onRemove: () => void
}

export function LineItemRow({ item, currency, onUpdate, onRemove }: LineItemRowProps) {
  const handleQuantityChange = (value: string) => {
    const quantity = Number.parseFloat(value) || 0
    onUpdate({
      quantity,
      amount: quantity * item.rate,
    })
  }

  const handleRateChange = (value: string) => {
    const rate = Number.parseFloat(value) || 0
    onUpdate({
      rate,
      amount: item.quantity * rate,
    })
  }

  return (
    <div className="grid grid-cols-12 gap-2 items-center">
      <div className="col-span-5">
        <Input
          value={item.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Item description"
        />
      </div>
      <div className="col-span-2">
        <Input
          type="number"
          min="1"
          step="1"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          className="text-right"
        />
      </div>
      <div className="col-span-2">
        <Input
          type="number"
          min="0"
          step="0.01"
          value={item.rate}
          onChange={(e) => handleRateChange(e.target.value)}
          className="text-right"
        />
      </div>
      <div className="col-span-2">
        <Input value={formatCurrency(item.amount, currency)} readOnly className="text-right bg-muted" />
      </div>
      <div className="col-span-1 flex justify-center">
        <Button variant="ghost" size="icon" onClick={onRemove} className="h-8 w-8">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Remove item</span>
        </Button>
      </div>
    </div>
  )
}
