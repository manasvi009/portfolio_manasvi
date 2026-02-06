import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// Font definitions - used in className
const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Manasvi Limbasiya | Full Stack Developer & AI/ML Engineer',
  description: 'Portfolio of Manasvi Limbasiya - Full Stack Developer, AI/ML Engineer, and UI/UX Enthusiast. Building scalable solutions with modern technologies.',
  keywords: ['Full Stack Developer', 'AI Engineer', 'ML Engineer', 'React', 'Next.js', 'Portfolio'],
  authors: [{ name: 'Manasvi Limbasiya' }],
  openGraph: {
    title: 'Manasvi Limbasiya | Full Stack Developer',
    description: 'Building scalable solutions with modern technologies',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
