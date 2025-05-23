import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Snowfall } from "@/components/Snowfall"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Rain.gg - Use Code MEASTER for Exclusive Rewards",
  description:
    "Get exclusive rewards, dynamic rakeback, and join community events when you use affiliate code MEASTER on Rain.gg",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Snowfall />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

