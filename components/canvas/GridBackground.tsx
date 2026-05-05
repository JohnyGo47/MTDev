'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function GridBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let W = window.innerWidth
    let H = window.innerHeight
    const SPACING = 60

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(0, W, 0, H, -1, 1)
    camera.position.z = 1

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    let cols = Math.ceil(W / SPACING) + 1
    let rows = Math.ceil(H / SPACING) + 1

    const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light'

    // Build grid
    type GridData = {
      lineMesh: THREE.LineSegments
      glowPoints: THREE.Points
      positions: Float32Array
      origPositions: Float32Array
      glowPositions: Float32Array
      cols: number
      rows: number
    }

    function buildGrid(cols: number, rows: number): GridData {
      const total = cols * rows
      const positions = new Float32Array(total * 3)
      const origPositions = new Float32Array(total * 3)

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = (r * cols + c) * 3
          const x = c * SPACING
          const y = r * SPACING
          positions[i] = x; positions[i + 1] = y; positions[i + 2] = 0
          origPositions[i] = x; origPositions[i + 1] = y; origPositions[i + 2] = 0
        }
      }

      // Count line segments
      let lineCount = 0
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (c < cols - 1) lineCount++
          if (r < rows - 1) lineCount++
        }
      }
      const linePosArr = new Float32Array(lineCount * 2 * 3)
      let li = 0
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = (r * cols + c) * 3
          if (c < cols - 1) {
            const ni = (r * cols + c + 1) * 3
            linePosArr[li++] = positions[i]; linePosArr[li++] = positions[i + 1]; linePosArr[li++] = 0
            linePosArr[li++] = positions[ni]; linePosArr[li++] = positions[ni + 1]; linePosArr[li++] = 0
          }
          if (r < rows - 1) {
            const di = ((r + 1) * cols + c) * 3
            linePosArr[li++] = positions[i]; linePosArr[li++] = positions[i + 1]; linePosArr[li++] = 0
            linePosArr[li++] = positions[di]; linePosArr[li++] = positions[di + 1]; linePosArr[li++] = 0
          }
        }
      }

      const lineGeo = new THREE.BufferGeometry()
      const linePosAttr = new THREE.BufferAttribute(linePosArr, 3)
      linePosAttr.setUsage(THREE.DynamicDrawUsage)
      lineGeo.setAttribute('position', linePosAttr)

      const lineMat = new THREE.LineBasicMaterial({
        color: isDark() ? 0xffffff : 0x000000,
        transparent: true,
        opacity: 0.05,
      })
      const lineMesh = new THREE.LineSegments(lineGeo, lineMat)
      scene.add(lineMesh)

      // Glow points
      const glowPositions = new Float32Array(total * 3)
      const glowGeo = new THREE.BufferGeometry()
      glowGeo.setAttribute('position', new THREE.BufferAttribute(glowPositions, 3))
      const glowMat = new THREE.PointsMaterial({ color: 0xFF5500, size: 3, transparent: true, opacity: 0 })
      const glowPoints = new THREE.Points(glowGeo, glowMat)
      scene.add(glowPoints)

      return { lineMesh, glowPoints, positions, origPositions, glowPositions, cols, rows }
    }

    let grid = buildGrid(cols, rows)

    const mouse = { x: -9999, y: -9999 }
    let scrollY = 0
    let rafId: number

    const onMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onScroll = () => { scrollY = window.scrollY }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('scroll', onScroll, { passive: true })

    const observer = new MutationObserver(() => {
      const mat = grid.lineMesh.material as THREE.LineBasicMaterial
      mat.color.set(isDark() ? 0xffffff : 0x000000)
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const { positions, origPositions, glowPositions, cols, rows } = grid
      const total = cols * rows
      const scrollOffset = scrollY * 0.15

      for (let i = 0; i < total; i++) {
        const idx = i * 3
        const origX = origPositions[idx]
        const origY = origPositions[idx + 1]
        const screenY = origY - scrollOffset
        const dx = mouse.x - origX
        const dy = mouse.y - screenY
        const dist = Math.sqrt(dx * dx + dy * dy)

        let targetX = origX
        let targetY = origY

        if (dist < 150 && dist > 0.1) {
          const strength = (1 - dist / 150) * 28
          targetX += (dx / dist) * strength
          targetY += (dy / dist) * strength
        }

        positions[idx]     += (targetX - positions[idx]) * 0.08
        positions[idx + 1] += (targetY - positions[idx + 1]) * 0.08
        glowPositions[idx]     = positions[idx]
        glowPositions[idx + 1] = positions[idx + 1]
      }

      // Rebuild line positions
      const lineGeo = grid.lineMesh.geometry
      const linePosAttr = lineGeo.getAttribute('position') as THREE.BufferAttribute
      const linePosArr = linePosAttr.array as Float32Array
      let li = 0
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = (r * cols + c) * 3
          if (c < cols - 1) {
            const ni = (r * cols + c + 1) * 3
            linePosArr[li++] = positions[idx]; linePosArr[li++] = positions[idx + 1]; linePosArr[li++] = 0
            linePosArr[li++] = positions[ni]; linePosArr[li++] = positions[ni + 1]; linePosArr[li++] = 0
          }
          if (r < rows - 1) {
            const di = ((r + 1) * cols + c) * 3
            linePosArr[li++] = positions[idx]; linePosArr[li++] = positions[idx + 1]; linePosArr[li++] = 0
            linePosArr[li++] = positions[di]; linePosArr[li++] = positions[di + 1]; linePosArr[li++] = 0
          }
        }
      }
      linePosAttr.needsUpdate = true;
      (grid.glowPoints.geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true

      scene.position.y = scrollOffset
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight
      renderer.setSize(W, H)
      camera.right = W; camera.bottom = H
      camera.updateProjectionMatrix()
      scene.remove(grid.lineMesh)
      scene.remove(grid.glowPoints)
      grid.lineMesh.geometry.dispose()
      grid.glowPoints.geometry.dispose()
      cols = Math.ceil(W / SPACING) + 1
      rows = Math.ceil(H / SPACING) + 1
      grid = buildGrid(cols, rows)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
