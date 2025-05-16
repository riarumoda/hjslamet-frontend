"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Check, Loader2, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useAuth } from "@/hooks/use-auth"
import { submitPaymentConfirmation } from "@/lib/api"

export default function PaymentConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()

  const orderId = searchParams.get("orderId")
  const amount = searchParams.get("amount")

  const [bankName, setBankName] = useState("")
  const [accountName, setAccountName] = useState("")
  const [transferDate, setTransferDate] = useState("")
  const [transferAmount, setTransferAmount] = useState(amount || "")
  const [notes, setNotes] = useState("")
  const [receiptImage, setReceiptImage] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!user) {
    router.push("/auth/login?redirect=/payment-confirmation" + (orderId ? `?orderId=${orderId}` : ""))
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await submitPaymentConfirmation({
        orderId: orderId || "",
        bankName,
        accountName,
        transferDate,
        transferAmount,
        notes,
        receiptImage,
      })

      toast(
        "Payment confirmation submitted" +
        "We'll verify your payment and update your order status soon."+
        "default"
      )

      router.push("/account/orders")
    } catch (error) {
      toast(
        "Submission failed"+
        "There was an error submitting your payment confirmation. Please try again."+
        "destructive"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Payment Confirmation</h1>

        <Card>
          <CardHeader>
            <CardTitle>Confirm Your Payment</CardTitle>
            <CardDescription>Please provide your payment details to confirm your order</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orderId">Order ID</Label>
                <Input
                  id="orderId"
                  value={orderId || ""}
                  readOnly={!!orderId}
                  placeholder="Enter your order ID"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    id="bankName"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="e.g., Bank Central Asia"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountName">Account Name</Label>
                  <Input
                    id="accountName"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    placeholder="Name on your bank account"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="transferDate">Transfer Date</Label>
                  <Input
                    id="transferDate"
                    type="date"
                    value={transferDate}
                    onChange={(e) => setTransferDate(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transferAmount">Transfer Amount</Label>
                  <Input
                    id="transferAmount"
                    type="number"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="receiptImage">Payment Receipt</Label>
                <div className="border rounded-md p-4 flex flex-col items-center justify-center gap-2">
                  <div className="w-full flex items-center justify-center border-2 border-dashed rounded-md h-32 bg-muted/50">
                    {receiptImage ? (
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                        <Check className="h-5 w-5" />
                        <span>{receiptImage.name}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-muted-foreground">
                        <Upload className="h-8 w-8" />
                        <span>Upload payment receipt</span>
                      </div>
                    )}
                  </div>
                  <Input
                    id="receiptImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setReceiptImage(e.target.files[0])
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("receiptImage")?.click()}
                  >
                    Select File
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional information about your payment"
                  rows={3}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Payment Confirmation"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
