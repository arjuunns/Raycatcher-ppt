export function formatINR(value: number, unit: "rupee" | "thousand" | "lakh" = "rupee", decimals = 0) {
  if (isNaN(value) || value === null) return "-"

  let scaled = value
  let suffix = ""
  if (unit === "thousand") {
    scaled = value / 1_000
    suffix = ""
  } else if (unit === "lakh") {
    scaled = value / 100_000
    suffix = ""
  }

  const rounded = Number(scaled.toFixed(decimals))

  // Indian number grouping
  const parts = rounded.toString().split(".")
  let intPart = parts[0]
  const decPart = parts[1]

  const last3 = intPart.slice(-3)
  const rest = intPart.slice(0, -3)
  const groups = rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last3 : last3

  const formatted = decPart ? `${groups}.${decPart}` : groups

  return `₹${formatted}${suffix}`
}
