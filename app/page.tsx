import { Hero } from '@/components/sections/Hero'
import { PortfolioGrid } from '@/components/sections/PortfolioGrid'
import { Services } from '@/components/sections/Services'
import { Process } from '@/components/sections/Process'
import { AboutSnippet } from '@/components/sections/AboutSnippet'
import { ContactCTA } from '@/components/sections/ContactCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <PortfolioGrid />
      <Services />
      <Process />
      <AboutSnippet />
      <ContactCTA />
    </>
  )
}
