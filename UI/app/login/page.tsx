"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAuth } from "@/context/authContext"
import { toast } from "@/components/ui/use-toast"

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const {login, loading, register} = useAuth();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient", // Default role is user (patient)
    agreeToTerms: false,
    // Doctor specific fields
    specialization: "",
    experience: "",
    fee: "",
  })

  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("login")

  useEffect(() => {
    // Check if there's a tab parameter in the URL
    const tabParam = searchParams.get("tab")
    if (tabParam === "register") {
      setActiveTab("register")
    }
  }, [searchParams])

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login form submitted:', loginData)
    login(loginData.email, loginData.password)
      .then(() => console.log('Login successful'))
      .catch(error => console.error('Login failed:', error))
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
      return;
    }

    if (registerData.role === "doctor") {
      if (!registerData.specialization || !registerData.experience || !registerData.fee) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please fill in all doctor-specific fields",
        });
        return;
      }
    }

    try {
      await register(
        registerData.name,
        registerData.email,
        registerData.password,
        registerData.role,
        registerData.role === "doctor" ? {
          specialization: registerData.specialization,
          experience: parseInt(registerData.experience),
          fee: parseFloat(registerData.fee)
        } : undefined
      );
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-bold text-teal-500">MediBook</span>
          </Link>
          <h2 className="mt-4 text-2xl font-bold">Welcome back</h2>
          <p className="mt-2 text-muted-foreground">Sign in to your account or create a new one</p>
        </div>

        <div className="bg-card rounded-xl border border-border/40 shadow-sm overflow-hidden">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-none">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="p-6">
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-teal-500 hover:text-teal-600">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    checked={loginData.rememberMe}
                    onCheckedChange={(checked) => setLoginData({ ...loginData, rememberMe: checked as boolean })}
                  />
                  <Label htmlFor="remember-me" className="text-sm font-normal">
                    Remember me
                  </Label>
                </div>

                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                  Sign in
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="p-6">
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Full Name</Label>
                  <Input
                    id="register-name"
                    placeholder="John Doe"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-password"
                      type={showRegisterPassword ? "text" : "password"}
                      className="pl-10 pr-10"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    >
                      {showRegisterPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Role</Label>
                  <RadioGroup
                    value={registerData.role}
                    onValueChange={(value) => setRegisterData({ ...registerData, role: value })}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="patient" id="patient" />
                      <Label htmlFor="patient" className="text-sm font-normal">Patient</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="doctor" id="doctor" />
                      <Label htmlFor="doctor" className="text-sm font-normal">Doctor</Label>
                    </div>
                  </RadioGroup>
                </div>

                {registerData.role === "doctor" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Input
                        id="specialization"
                        placeholder="e.g., Cardiology, Neurology"
                        value={registerData.specialization}
                        onChange={(e) => setRegisterData({ ...registerData, specialization: e.target.value })}
                        required={registerData.role === "doctor"}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        type="number"
                        min="0"
                        placeholder="e.g., 5"
                        value={registerData.experience}
                        onChange={(e) => setRegisterData({ ...registerData, experience: e.target.value })}
                        required={registerData.role === "doctor"}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fee">Consultation Fee (USD)</Label>
                      <Input
                        id="fee"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="e.g., 50.00"
                        value={registerData.fee}
                        onChange={(e) => setRegisterData({ ...registerData, fee: e.target.value })}
                        required={registerData.role === "doctor"}
                      />
                    </div>
                  </>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agree-terms"
                    checked={registerData.agreeToTerms}
                    onCheckedChange={(checked) => setRegisterData({ ...registerData, agreeToTerms: checked as boolean })}
                    required
                  />
                  <Label htmlFor="agree-terms" className="text-sm font-normal">
                    I agree to the terms and conditions
                  </Label>
                </div>

                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
