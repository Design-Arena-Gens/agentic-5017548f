import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Content Factory - Automated Video Production Workflow',
  description: 'A comprehensive 65-node workflow for automated AI video content creation with 95% automation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-dark-950 text-white antialiased">
        {children}
      </body>
    </html>
  )
}
