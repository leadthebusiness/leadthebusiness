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
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            if (typeof AbortSignal !== 'undefined' && !AbortSignal.timeout) {
              AbortSignal.timeout = function(milliseconds) {
                const controller = new AbortController();
                setTimeout(() => controller.abort(), milliseconds);
                return controller.signal;
              };
            }
          `
        }} />
      </head>
      <body className='bg-black'>{children}</body>
    </html>
  )
}
