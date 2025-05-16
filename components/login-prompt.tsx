import Link from "next/link"
import { LockKeyhole } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface LoginPromptProps {
  returnUrl?: string
}

export default function LoginPrompt({ returnUrl = "/" }: LoginPromptProps) {
  const encodedReturnUrl = encodeURIComponent(returnUrl)

  return (
    <div className="container flex items-center justify-center min-h-[70vh] px-4 py-12">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <LockKeyhole className="h-10 w-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Login Required</CardTitle>
          <CardDescription>Please login or create an account to view this content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            To access product details, make purchases, and manage your orders, you need to be logged in.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link href={`/auth/login?returnUrl=${encodedReturnUrl}`} className="w-full">
            <Button className="w-full">Login</Button>
          </Link>
          <Link href={`/auth/register?returnUrl=${encodedReturnUrl}`} className="w-full">
            <Button variant="outline" className="w-full">
              Create Account
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
