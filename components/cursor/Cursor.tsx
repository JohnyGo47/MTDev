'use client'
import { useEffect, useRef, useState } from 'react'

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const [label, setLabel] = useState('')
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches
    if (isMobile) return

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)

      const el = e.target as Element
      const interactive = el.closest('a, button, [data-cursor]')
      if (interactive) {
        setHovered(true)
        setLabel((interactive as HTMLElement).dataset.cursor || '')
      } else {
        setHovered(false)
        setLabel('')
      }
    }

    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)

    let rafId: number
    const loop = () => {
      rafId = requestAnimationFrame(loop)
      pos.current.x += (target.current.x - pos.current.x) * 0.15
      pos.current.y += (target.current.y - pos.current.y) * 0.15
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
      }
    }
    loop()

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafId)
    }
  }, [visible])

  return (
    <div
      ref={dotRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.2s',
        willChange: 'transform',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        style={{
          width: hovered ? '4px' : '7px',
          height: hovered ? '4px' : '7px',
          borderRadius: '50%',
          background: 'var(--orange)',
          transition: 'width 0.15s, height 0.15s',
          marginLeft: hovered ? '-2px' : '-3.5px',
          marginTop: hovered ? '-2px' : '-3.5px',
        }}
      />
      {label && (
        <span
          style={{
            position: 'absolute',
            left: '12px',
            top: '-4px',
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '10px',
            color: 'var(--fg-2)',
            whiteSpace: 'nowrap',
            opacity: label ? 1 : 0,
            transition: 'opacity 0.15s',
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}
