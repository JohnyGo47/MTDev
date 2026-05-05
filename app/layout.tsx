import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/hooks/useLanguage'
import { ThemeProvider } from '@/hooks/useTheme'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { PageTransition } from '@/components/layout/PageTransition'
import { GridBackground } from '@/components/canvas/GridBackground'
import { Cursor } from '@/components/cursor/Cursor'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'MTDev — Digital Studio · Almaty',
  description: 'MTDev is an Almaty-based studio building premium digital experiences for businesses and startups. Seven people. One project at a time.',
  keywords: ['web design', 'web development', 'Almaty', 'digital studio', 'Next.js'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <LanguageProvider>
            <SmoothScroll>
              <GridBackground />
              <Cursor />
              <Nav />
              <PageTransition>
                <main style={{ position: 'relative', zIndex: 1 }}>
                  {children}
                </main>
                <Footer />
              </PageTransition>
            </SmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
