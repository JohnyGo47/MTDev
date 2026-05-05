'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'

const barVariants = {
  initial: { scaleX: 0, transformOrigin: 'left' },
  animate: { scaleX: 1, transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] } },
  exit:    { scaleX: 0, transformOrigin: 'right', transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] } },
}

const contentVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25, delay: 0.35 } },
  exit:    { opacity: 0, transition: { duration: 0.15 } },
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname + '-bar'}
          variants={barVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            position: 'fixed',
            top: '45vh',
            left: 0,
            width: '100%',
            height: '3px',
            background: 'var(--orange)',
            zIndex: 9998,
            pointerEvents: 'none',
          }}
        />
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
