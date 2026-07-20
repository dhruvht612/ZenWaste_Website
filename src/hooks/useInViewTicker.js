import { useEffect, useRef, useState } from 'react'

/**
 * Drives the "live" product demos. Returns [ref, tick, inView] where `tick`
 * increments every `intervalMs` — but ONLY while the element is on screen, so
 * the hero Command Center feels alive without burning cycles off-screen.
 *
 * Respects prefers-reduced-motion: the ticker never advances, so the demo
 * rests on a single, fully-legible state instead of animating.
 */
export function useInViewTicker(intervalMs = 2600) {
  const ref = useRef(null)
  const [tick, setTick] = useState(0)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let visible = false
    let timer = 0

    const start = () => {
      if (timer || reduced) return
      timer = window.setInterval(() => setTick((t) => t + 1), intervalMs)
    }
    const stop = () => {
      if (timer) {
        clearInterval(timer)
        timer = 0
      }
    }

    if (!('IntersectionObserver' in window)) {
      setInView(true)
      start()
      return stop
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        setInView(visible)
        if (visible) start()
        else stop()
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      stop()
    }
  }, [intervalMs])

  return [ref, tick, inView]
}
