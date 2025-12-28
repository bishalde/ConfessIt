import './globals.css'

export const metadata = {
  title: 'ConfessIt - Share Your Confessions Anonymously',
  description: 'A safe space to share your thoughts and confessions anonymously',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
