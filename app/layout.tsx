import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cherish - Employee Recognition Platform',
  description: 'Boost morale and productivity with our employee recognition platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
