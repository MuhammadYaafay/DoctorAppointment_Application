"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AdminSettings() {
  const [generalSettings, setGeneralSettings] = useState({
    clinicName: "MediBook Health Center",
    email: "admin@medibook.com",
    phone: "+1 (555) 123-4567",
    address: "123 Medical Plaza, Healthcare Avenue, City, Country",
    workingHours: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 2:00 PM\nSunday: Closed",
    enableBookings: true,
    enableReviews: true,
    enableNotifications: true,
  })

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "notifications@medibook.com",
    smtpPassword: "••••••••••••",
    senderName: "MediBook Notifications",
    senderEmail: "notifications@medibook.com",
    enableEmailNotifications: true,
  })

  const [paymentSettings, setPaymentSettings] = useState({
    currency: "USD",
    enableOnlinePayments: true,
    paymentGateway: "stripe",
    stripePublicKey: "pk_test_••••••••••••••••••••••••••••",
    stripeSecretKey: "sk_test_••••••••••••••••••••••••••••",
    enablePaypalPayments: false,
    paypalClientId: "",
    paypalSecretKey: "",
  })

  const handleGeneralSettingsChange = (field: string, value: any) => {
    setGeneralSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleEmailSettingsChange = (field: string, value: any) => {
    setEmailSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePaymentSettingsChange = (field: string, value: any) => {
    setPaymentSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your application settings and configurations</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your clinic information and general application settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="clinic-name">Clinic Name</Label>
                  <Input
                    id="clinic-name"
                    value={generalSettings.clinicName}
                    onChange={(e) => handleGeneralSettingsChange("clinicName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={generalSettings.email}
                    onChange={(e) => handleGeneralSettingsChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={generalSettings.phone}
                    onChange={(e) => handleGeneralSettingsChange("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={generalSettings.address}
                    onChange={(e) => handleGeneralSettingsChange("address", e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="working-hours">Working Hours</Label>
                  <Textarea
                    id="working-hours"
                    rows={4}
                    value={generalSettings.workingHours}
                    onChange={(e) => handleGeneralSettingsChange("workingHours", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border/40">
                <h3 className="text-lg font-medium">Features</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enable-bookings">Enable Bookings</Label>
                      <p className="text-sm text-muted-foreground">Allow patients to book appointments online</p>
                    </div>
                    <Switch
                      id="enable-bookings"
                      checked={generalSettings.enableBookings}
                      onCheckedChange={(checked) => handleGeneralSettingsChange("enableBookings", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enable-reviews">Enable Reviews</Label>
                      <p className="text-sm text-muted-foreground">Allow patients to leave reviews for doctors</p>
                    </div>
                    <Switch
                      id="enable-reviews"
                      checked={generalSettings.enableReviews}
                      onCheckedChange={(checked) => handleGeneralSettingsChange("enableReviews", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enable-notifications">Enable Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send email and SMS notifications for appointments</p>
                    </div>
                    <Switch
                      id="enable-notifications"
                      checked={generalSettings.enableNotifications}
                      onCheckedChange={(checked) => handleGeneralSettingsChange("enableNotifications", checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-teal-600 hover:bg-teal-700">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>Configure email server settings for notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtp-server">SMTP Server</Label>
                  <Input
                    id="smtp-server"
                    value={emailSettings.smtpServer}
                    onChange={(e) => handleEmailSettingsChange("smtpServer", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input
                    id="smtp-port"
                    value={emailSettings.smtpPort}
                    onChange={(e) => handleEmailSettingsChange("smtpPort", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-username">SMTP Username</Label>
                  <Input
                    id="smtp-username"
                    value={emailSettings.smtpUsername}
                    onChange={(e) => handleEmailSettingsChange("smtpUsername", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-password">SMTP Password</Label>
                  <Input
                    id="smtp-password"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => handleEmailSettingsChange("smtpPassword", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sender-name">Sender Name</Label>
                  <Input
                    id="sender-name"
                    value={emailSettings.senderName}
                    onChange={(e) => handleEmailSettingsChange("senderName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sender-email">Sender Email</Label>
                  <Input
                    id="sender-email"
                    type="email"
                    value={emailSettings.senderEmail}
                    onChange={(e) => handleEmailSettingsChange("senderEmail", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border/40">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-email-notifications">Enable Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send email notifications for appointments and reminders
                    </p>
                  </div>
                  <Switch
                    id="enable-email-notifications"
                    checked={emailSettings.enableEmailNotifications}
                    onCheckedChange={(checked) => handleEmailSettingsChange("enableEmailNotifications", checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-teal-600 hover:bg-teal-700">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Configure payment gateways and options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    id="currency"
                    value={paymentSettings.currency}
                    onChange={(e) => handlePaymentSettingsChange("currency", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enable-online-payments">Enable Online Payments</Label>
                    <Switch
                      id="enable-online-payments"
                      checked={paymentSettings.enableOnlinePayments}
                      onCheckedChange={(checked) => handlePaymentSettingsChange("enableOnlinePayments", checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border/40">
                <h3 className="text-lg font-medium">Stripe Integration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="stripe-public-key">Stripe Public Key</Label>
                    <Input
                      id="stripe-public-key"
                      value={paymentSettings.stripePublicKey}
                      onChange={(e) => handlePaymentSettingsChange("stripePublicKey", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stripe-secret-key">Stripe Secret Key</Label>
                    <Input
                      id="stripe-secret-key"
                      type="password"
                      value={paymentSettings.stripeSecretKey}
                      onChange={(e) => handlePaymentSettingsChange("stripeSecretKey", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border/40">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-paypal-payments">Enable PayPal Payments</Label>
                    <p className="text-sm text-muted-foreground">Allow payments through PayPal</p>
                  </div>
                  <Switch
                    id="enable-paypal-payments"
                    checked={paymentSettings.enablePaypalPayments}
                    onCheckedChange={(checked) => handlePaymentSettingsChange("enablePaypalPayments", checked)}
                  />
                </div>

                {paymentSettings.enablePaypalPayments && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="paypal-client-id">PayPal Client ID</Label>
                      <Input
                        id="paypal-client-id"
                        value={paymentSettings.paypalClientId}
                        onChange={(e) => handlePaymentSettingsChange("paypalClientId", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paypal-secret-key">PayPal Secret Key</Label>
                      <Input
                        id="paypal-secret-key"
                        type="password"
                        value={paymentSettings.paypalSecretKey}
                        onChange={(e) => handlePaymentSettingsChange("paypalSecretKey", e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-teal-600 hover:bg-teal-700">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
