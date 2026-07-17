import { useEffect, useRef } from 'react'

/**
 * Pointer-reactive 3D tilt + spotlight for cards. Sets --rx/--ry (rotation)
 * and --gx/--gy (glow origin) custom properties. Disabled for reduced motion
 * and coarse pointers so touch users get a flat, stable card.
 */
export function useTilt({ max = 6 } = {}) {
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
      const cx = (e.clientX - rect.left) / rect.width
      const cy = (e.clientY - rect.top) / rect.height
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--rx', `${(cx - 0.5) * max}deg`)
        el.style.setProperty('--ry', `${(0.5 - cy) * max}deg`)
        el.style.setProperty('--gx', `${cx * 100}%`)
        el.style.setProperty('--gy', `${cy * 100}%`)
      })
    }
    const reset = () => {
      cancelAnimationFrame(frame)
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', reset)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', reset)
    }
  }, [max])

  return ref
}
