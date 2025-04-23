"use client"

// This is a simplified version of the toast hook
// In a real app, you would use a proper toast library

import { useState } from "react"

type ToastVariant = "default" | "destructive"

interface ToastProps {
  title: string
  description: string
  variant?: ToastVariant
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = (props: ToastProps) => {
    // In a real app, this would show a toast notification
    // For this demo, we'll just log to console
    console.log(`TOAST: ${props.variant || "default"} - ${props.title}`, props.description)

    // Show an alert for demo purposes
    alert(`${props.title}\n${props.description}`)

    setToasts((prev) => [...prev, props])
  }

  return { toast, toasts }
}
