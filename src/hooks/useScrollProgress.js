import { useEffect, useRef, useState } from 'react'

/**
 * Returns [ref, progress] where progress is 0..1 as the referenced element
 * travels through the viewport (0 when its top hits the viewport top, 1 when
 * its bottom reaches the viewport bottom). Updated on a rAF-throttled scroll
 * listener so the sticky story stage stays at 60fps.
 */
export function useScrollProgress() {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let frame = 0
    const compute = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      if (total <= 0) {
        setProgress(rect.top <= 0 ? 1 : 0)
        return
      }
      const p = Math.min(1, Math.max(0, -rect.top / total))
      setProgress(p)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return [ref, progress]
}
