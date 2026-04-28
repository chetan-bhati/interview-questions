import '../styles/globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Interview Prep — Premium Edition',
  description: 'Master interview preparation with structured questions and expert answers',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  )
}
