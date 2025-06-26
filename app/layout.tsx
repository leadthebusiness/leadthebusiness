import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Basesh Gala',
  description: 'created by Basesh Gala',
  generator: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className='bg-black'>{children}</body>
    </html>
  )
}
