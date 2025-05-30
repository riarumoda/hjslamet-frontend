"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"

export default function SettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user, isLoading, deleteAccount } = useAuth()

  const [emailNotifications, setEmailNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    productUpdates: false,
  })

  const [privacySettings, setPrivacySettings] = useState({
    shareData: false,
    allowTracking: true,
    saveHistory: true,
  })

  const [isSaving, setIsSaving] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login?returnUrl=/account/settings")
    }
  }, [user, isLoading, router])

  const handleSaveNotifications = async () => {
    setIsSaving(true)

    try {
      // In a real app, this would call an API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Settings updated",
        description: "Your notification preferences have been updated.",
      })
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating your settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSavePrivacy = async () => {
    setIsSaving(true)

    try {
      // In a real app, this would call an API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Settings updated",
        description: "Your privacy settings have been updated.",
      })
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating your settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true)

    try {
      await deleteAccount()

      toast({
        title: "Account deleted",
        description: "Your account has been successfully deleted.",
      })

      router.push("/")
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "There was an error deleting your account. Please try again.",
        variant: "destructive",
      })
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and settings</p>
      </div>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>Manage your email notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="order-updates">Order Updates</Label>
                <p className="text-sm text-muted-foreground">Receive notifications about your order status</p>
              </div>
              <Switch
                id="order-updates"
                checked={emailNotifications.orderUpdates}
                onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, orderUpdates: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="promotions">Promotions and Discounts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails about promotions, discounts, and special offers
                </p>
              </div>
              <Switch
                id="promotions"
                checked={emailNotifications.promotions}
                onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, promotions: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="newsletter">Newsletter</Label>
                <p className="text-sm text-muted-foreground">
                  Receive our weekly newsletter with new products and trends
                </p>
              </div>
              <Switch
                id="newsletter"
                checked={emailNotifications.newsletter}
                onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, newsletter: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="product-updates">Product Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates about products you've purchased or viewed
                </p>
              </div>
              <Switch
                id="product-updates"
                checked={emailNotifications.productUpdates}
                onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, productUpdates: checked })}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveNotifications} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Notification Preferences"
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
            <CardDescription>Manage how your data is used and stored</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="share-data">Data Sharing</Label>
                <p className="text-sm text-muted-foreground">Allow us to share your data with our trusted partners</p>
              </div>
              <Switch
                id="share-data"
                checked={privacySettings.shareData}
                onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, shareData: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="allow-tracking">Website Tracking</Label>
                <p className="text-sm text-muted-foreground">
                  Allow us to track your activity on our website to improve your experience
                </p>
              </div>
              <Switch
                id="allow-tracking"
                checked={privacySettings.allowTracking}
                onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, allowTracking: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="save-history">Browsing History</Label>
                <p className="text-sm text-muted-foreground">
                  Save your browsing history to provide personalized recommendations
                </p>
              </div>
              <Switch
                id="save-history"
                checked={privacySettings.saveHistory}
                onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, saveHistory: checked })}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSavePrivacy} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Privacy Settings"
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delete Account</CardTitle>
            <CardDescription>Permanently delete your account and all associated data</CardDescription>
          </CardHeader>
          <CardContent>
            {showDeleteConfirm ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Are you sure you want to delete your account?</AlertTitle>
                <AlertDescription>
                  This action cannot be undone. All your data will be permanently deleted.
                </AlertDescription>
                <div className="flex gap-2 mt-4">
                  <Button variant="destructive" onClick={handleDeleteAccount} disabled={isDeleting}>
                    {isDeleting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      "Yes, Delete My Account"
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} disabled={isDeleting}>
                    Cancel
                  </Button>
                </div>
              </Alert>
            ) : (
              <p className="text-muted-foreground">
                Once you delete your account, there is no going back. Please be certain.
              </p>
            )}
          </CardContent>
          {!showDeleteConfirm && (
            <CardFooter>
              <Button variant="destructive" onClick={() => setShowDeleteConfirm(true)}>
                Delete Account
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}
