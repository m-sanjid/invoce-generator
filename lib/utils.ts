import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  if (!dateString) return ""

  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    minimumFractionDigits: 2,
  }).format(amount)
}

export function calculateSubtotal(lineItems: { amount: number }[]): number {
  return lineItems.reduce((sum, item) => sum + item.amount, 0)
}

export function calculateTax(subtotal: number, taxRate: number): number {
  return subtotal * (taxRate / 100)
}

export function calculateDiscount(subtotal: number, discountRate: number): number {
  return subtotal * (discountRate / 100)
}

export function calculateTotal(subtotal: number, tax: number, discount: number): number {
  return subtotal + tax - discount
}
