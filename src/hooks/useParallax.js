import { useEffect, useRef } from 'react'

/**
 * Subtle pointer parallax (spec: hero mockup should feel alive, not static).
 * Sets --px / --py custom properties in a -1..1 range on the returned ref,
 * throttled to one write per animation frame. Disabled entirely when the
 * user prefers reduced motion or lacks a fine pointer (touch devices).
 */
export function useParallax() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(pointer: fine)').matches
    if (reduce || !fine) return

    let frame = 0

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const px = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const py = ((e.clientY - rect.top) / rect.height) * 2 - 1
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--px', clamp(px).toFixed(3))
        el.style.setProperty('--py', clamp(py).toFixed(3))
      })
    }

    const reset = () => {
      cancelAnimationFrame(frame)
      el.style.setProperty('--px', '0')
      el.style.setProperty('--py', '0')
    }

    const zone = el.closest('.hero') || el
    zone.addEventListener('mousemove', onMove)
    zone.addEventListener('mouseleave', reset)

    return () => {
      cancelAnimationFrame(frame)
      zone.removeEventListener('mousemove', onMove)
      zone.removeEventListener('mouseleave', reset)
    }
  }, [])

  return ref
}

function clamp(v) {
  return Math.max(-1, Math.min(1, v))
}
