import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BITMAP CONVERTER',
  description: 'Transform images into retro bitmap graphics with advanced dithering algorithms',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                const shouldBeDark = theme === 'dark';
                
                if (shouldBeDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white antialiased transition-colors duration-200">
        {children}
      </body>
    </html>
  )
}