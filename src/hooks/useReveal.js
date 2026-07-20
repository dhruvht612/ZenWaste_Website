import { useEffect, useRef } from 'react'

/**
 * Scroll-into-view enhancement: content rises + fades the first time it
 * enters the viewport. Content is visible by default and is only hidden
 * ("armed") by JS for elements still below the fold — so no-JS, headless,
 * reader-mode, and reduced-motion contexts always get a fully visible page.
 */
export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) return

    const targets = el.matches('[data-reveal]')
      ? [el]
      : Array.from(el.querySelectorAll('[data-reveal]'))

    // Arm only what the visitor hasn't reached yet.
    const armed = targets.filter(
      (t) => t.getBoundingClientRect().top > window.innerHeight * 0.85,
    )
    armed.forEach((t) => t.classList.add('will-reveal'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('will-reveal')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    armed.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return ref
}
