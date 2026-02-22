const PptxGenJS = require("pptxgenjs")
const puppeteer = require("puppeteer")
const path = require("path")
const fs = require("fs")

// Create slides configuration
const slides = [
  { id: 1, title: "RayCatcher" },
  { id: 2, title: "Problem" },
  { id: 3, title: "Solution" },
  { id: 4, title: "Market" },
  { id: 5, title: "Segments" },
  { id: 6, title: "Business" },
  { id: 7, title: "Activities" },
  { id: 8, title: "Financials" },
  { id: 9, title: "The Ask" },
  { id: 10, title: "Team" },
  { id: 11, title: "Simulator" },
  { id: 12, title: "Thank You" },
]

async function captureSlides() {
  console.log("🚀 Starting presentation generation...")

  // Create temp directory for screenshots
  const tempDir = path.join(__dirname, "..", "temp-screenshots")
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true })
  }

  console.log("🌐 Launching browser...")
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  })

  const page = await browser.newPage()

  // Set viewport to standard presentation size (16:9 aspect ratio)
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 2 // Higher quality screenshots
  })

  const screenshotPaths = []

  try {
    // Navigate to the Next.js app (assume it's running on localhost:3000)
    const baseUrl = process.env.BASE_URL || "http://localhost:3000"
    console.log(`📡 Connecting to ${baseUrl}...`)

    await page.goto(baseUrl, { waitUntil: "networkidle0", timeout: 30000 })

    // Wait a bit for animations to settle
    await new Promise(resolve => setTimeout(resolve, 2000))

    for (const slide of slides) {
      console.log(`📸 Capturing slide ${slide.id}: ${slide.title}...`)

      // Scroll to the specific slide
      await page.evaluate((slideId) => {
        const element = document.getElementById(`slide-${slideId}`)
        if (element) {
          element.scrollIntoView({ behavior: "instant" })
        }
      }, slide.id)

      // Wait for scroll and animations
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Additional wait for framer-motion animations to complete
      await page.evaluate(() => {
        return new Promise((resolve) => {
          requestAnimationFrame(() => {
            setTimeout(resolve, 1000)
          })
        })
      })

      // Take screenshot of the specific slide section
      const slideElement = await page.$(`#slide-${slide.id}`)
      if (slideElement) {
        const screenshotPath = path.join(tempDir, `slide-${slide.id}.png`)
        await slideElement.screenshot({
          path: screenshotPath,
          type: "png"
        })
        screenshotPaths.push({ id: slide.id, path: screenshotPath, title: slide.title })
        console.log(`✅ Captured slide ${slide.id}`)
      } else {
        console.warn(`⚠️  Could not find slide ${slide.id}`)
      }
    }
  } catch (error) {
    console.error("❌ Error capturing slides:", error.message)
    throw error
  } finally {
    await browser.close()
  }

  return screenshotPaths
}

async function createPowerPoint(screenshotPaths) {
  console.log("📊 Creating PowerPoint presentation...")

  const pptx = new PptxGenJS()

  // Set presentation properties
  pptx.author = "RayCatcher Team"
  pptx.title = "RayCatcher - Smart Solar Tracking System"
  pptx.subject = "Startup Pitch Deck - Venture Lab TIET"
  pptx.company = "RayCatcher"

  // Set layout to 16:9 widescreen
  pptx.layout = "LAYOUT_WIDE"

  for (const screenshot of screenshotPaths) {
    console.log(`➕ Adding slide ${screenshot.id}: ${screenshot.title}`)
    const slide = pptx.addSlide()

    // Add the screenshot as a full-slide image
    slide.addImage({
      path: screenshot.path,
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
      sizing: { type: "contain", w: "100%", h: "100%" }
    })
  }

  // Save the presentation with timestamp to avoid file locking issues
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0]
  const fileName = `RayCatcher-Pitch-Deck-${timestamp}.pptx`

  try {
    await pptx.writeFile({ fileName })
    console.log(`✅ Presentation saved as ${fileName}`)
  } catch (err) {
    // If file is locked, try with a different name
    const altFileName = `RayCatcher-Pitch-Deck-${Date.now()}.pptx`
    await pptx.writeFile({ fileName: altFileName })
    console.log(`✅ Presentation saved as ${altFileName}`)
    return altFileName
  }

  return fileName
}

async function cleanup(screenshotPaths) {
  console.log("🧹 Cleaning up temporary files...")
  const tempDir = path.join(__dirname, "..", "temp-screenshots")

  try {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true })
      console.log("✅ Cleanup complete")
    }
  } catch (error) {
    console.warn("⚠️  Cleanup warning:", error.message)
  }
}

async function main() {
  console.log("\n" + "=".repeat(60))
  console.log("   RayCatcher PPTX Generator")
  console.log("=".repeat(60) + "\n")

  try {
    console.log("📝 Make sure your Next.js dev server is running on http://localhost:3000")
    console.log("   Run 'pnpm dev' in another terminal if it's not running yet.\n")

    // Give user time to read the message
    await new Promise(resolve => setTimeout(resolve, 5000))

    const screenshotPaths = await captureSlides()
    await createPowerPoint(screenshotPaths)
    await cleanup(screenshotPaths)

    console.log("\n" + "=".repeat(60))
    console.log("✨ SUCCESS! Your presentation is ready!")
    console.log("=".repeat(60) + "\n")
  } catch (error) {
    console.error("\n" + "=".repeat(60))
    console.error("❌ ERROR:", error.message)
    console.error("=".repeat(60))
    console.error("\nTroubleshooting:")
    console.error("1. Make sure your Next.js app is running: pnpm dev")
    console.error("2. Check that it's accessible at http://localhost:3000")
    console.error("3. Ensure all dependencies are installed: pnpm install")
    console.error("\n")
    process.exit(1)
  }
}

main()
