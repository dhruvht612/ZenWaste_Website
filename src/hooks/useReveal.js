import { useEffect, useRef } from 'react'

/**
 * Scroll-into-view enhancement (spec §5): content is revealed with an
 * 8px rise + fade the first time it enters the viewport. Content is never
 * gated — if IntersectionObserver is unavailable, everything is shown.
 */
export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = el.matches('[data-reveal]')
      ? [el]
      : Array.from(el.querySelectorAll('[data-reveal]'))

    if (!('IntersectionObserver' in window)) {
      targets.forEach((t) => t.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )

    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return ref
}
