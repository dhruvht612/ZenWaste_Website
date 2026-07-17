import { useEffect, useRef } from 'react'

/**
 * Mouse-reactive ambient light. Sets --mx/--my (as percentages) on the
 * attached element so a radial spotlight can follow the cursor. Skipped for
 * coarse pointers.
 */
export function useSpotlight() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    let frame = 0
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
        el.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
      })
    }
    el.addEventListener('mousemove', onMove)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('mousemove', onMove)
    }
  }, [])

  return ref
}
