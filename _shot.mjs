// Screenshot harness for visual QA of the ZenduWaste site.
// Usage:
//   node _shot.mjs                     full-page desktop + mobile
//   node _shot.mjs 1440                full-page at a given width
//   node _shot.mjs 1440 #compare       clip to one section by id
// Output: ./.shots/*.png
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const URL = process.env.SHOT_URL || 'http://localhost:5173/'
const OUT = '.shots'
mkdirSync(OUT, { recursive: true })

const widthArg = Number(process.argv[2]) || null
const sectionArg = process.argv[3] || null

const viewports = widthArg
  ? [{ name: `w${widthArg}`, width: widthArg, height: 900 }]
  : [
      { name: 'desktop', width: 1440, height: 900 },
      { name: 'tablet', width: 834, height: 1112 },
      { name: 'mobile', width: 390, height: 844 },
    ]

const browser = await chromium.launch()
for (const vp of viewports) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
  })
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(900) // let load-in animations settle
  const scrollY = Number(process.env.SHOT_SCROLL) || 0
  if (scrollY) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY)
    await page.waitForTimeout(700)
    await page.screenshot({ path: `${OUT}/${vp.name}-scroll${scrollY}.png` })
    await page.close()
    console.log(`shot: ${vp.name} @${scrollY}`)
    continue
  }
  if (sectionArg) {
    const el = await page.$(sectionArg)
    if (el) {
      await el.scrollIntoViewIfNeeded()
      await page.waitForTimeout(600)
      await el.screenshot({ path: `${OUT}/${vp.name}-${sectionArg.replace('#', '')}.png` })
    }
  } else {
    await page.screenshot({ path: `${OUT}/${vp.name}-full.png`, fullPage: true })
  }
  await page.close()
  console.log(`shot: ${vp.name}`)
}
await browser.close()
