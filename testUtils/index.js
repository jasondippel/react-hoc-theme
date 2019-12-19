/* istanbul ignore file */

/**
 * Determine if value is valid hex color code
 **/
const isHexColor = val => {
  if (!val || val[0] !== '#') return false
  val = val.substr(1)
  return (
    typeof val === 'string' &&
    (val.length === 6 || val.length === 3) &&
    !isNaN(parseInt(val, 16))
  )
}

/**
 * Returns properly formatted 6 digit hex color starting with a `#`
 **/
const formatHexColor = hex => {
  if (!isHexColor(hex)) {
    // eslint-disable-next-line no-console
    console.error('formatHexColor called with non-hex value')
    return false
  }

  if (hex[0] === '#') hex = hex.substr(1) // remove starting '#'
  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }

  return `#${hex}`
}

/**
 * Get red, green, and blue components from hex color code
 **/
const hexToRgb = hex => {
  if (!isHexColor(hex)) {
    // eslint-disable-next-line no-console
    console.error('hexToRgb called with non-hex value', hex)
    return
  }

  hex = formatHexColor(hex)
  hex = hex.substr(1) // remove starting '#'; guarenteed to be a `#` due to formatter

  let bigint = parseInt(hex, 16)
  let r = (bigint >> 16) & 255
  let g = (bigint >> 8) & 255
  let b = bigint & 255

  return [r, g, b]
}

const getRelativeLuminance = rgb => {
  const srgb = rgb.map(value => value / 255)
  const [R, G, B] = srgb.map(value =>
    value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
  )

  const L = 0.2126 * R + 0.7152 * G + 0.0722 * B

  return L
}

/**
 * Returns the contrast ratio of the two given hex colors
 **/
export const contrast = (c1, c2) => {
  if (!isHexColor(c1) || !isHexColor(c2)) {
    // eslint-disable-next-line no-console
    console.error('contrast called with non-hex value')
    return
  }

  const rgb1 = hexToRgb(c1)
  const rgb2 = hexToRgb(c2)

  const l1 = getRelativeLuminance(rgb1)
  const l2 = getRelativeLuminance(rgb2)

  const lightest = Math.max(l1, l2)
  const darkest = Math.min(l1, l2)

  const contrast = (lightest + 0.05) / (darkest + 0.05)

  return Math.floor(contrast * 100) / 100
}
