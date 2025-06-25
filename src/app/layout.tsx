import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HoustonHIVTest.org - Know Your Status, Own Your Health',
  description: 'Free HIV testing resources for Houston\'s LGBTQ+ and BIPOC communities. Find testing locations, order home test kits, and connect with support services.',
  keywords: ['HIV testing', 'Houston', 'LGBTQ', 'BIPOC', 'free testing', 'sexual health'],
  openGraph: {
    title: 'HoustonHIVTest.org - Know Your Status, Own Your Health',
    description: 'Free HIV testing resources for Houston\'s communities',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-pride-purple/10 to-pride-teal/10 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
