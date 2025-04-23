import type React from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/authContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-background`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <AuthErrorBoundary>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </AuthErrorBoundary>
        </AuthProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import { AuthErrorBoundary } from "@/components/auth-error-boundary";

export const metadata = {
  title: "Doctor Appointment System",
  author: "Muhammad Yaafay",
};
