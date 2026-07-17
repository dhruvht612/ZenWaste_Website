import { useEffect, useRef, useState } from 'react'

/**
 * Animates a number from 0 to `end` once the element scrolls into view.
 * Returns [ref, value]. Respects prefers-reduced-motion by jumping to the
 * final value immediately.
 */
export function useCountUp(end, { duration = 1600, decimals = 0 } = {}) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let start = 0

    const run = () => {
      const step = (now) => {
        if (!start) start = now
        const t = Math.min(1, (now - start) / duration)
        // ease-out-expo
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
        setValue(end * eased)
        if (t < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }

    if (reduce || !('IntersectionObserver' in window)) {
      setValue(end)
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run()
            obs.disconnect()
          }
        })
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [end, duration])

  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString()
  return [ref, display]
}
