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
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('formatHexColor called with non-hex value')
    }
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
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('hexToRgb called with non-hex value', hex)
    }
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

/**
 * Returns true if the given color is dark, false if not
 **/
export const isDark = hex => {
  if (!isHexColor(hex)) {
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('isDark called with non-hex value')
    }
    return false
  }

  let [r, g, b] = hexToRgb(hex)

  // equation from http://alienryderflex.com/hsp.html
  const brightness = Math.sqrt(
    0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b),
  )

  return brightness <= 127.5
}
