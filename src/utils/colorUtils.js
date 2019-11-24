/**
 * Determine if value is valid hex color code
 **/
export const isHexColor = val => {
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
export const expandHexColor = hex => {
  if (!isHexColor(hex)) {
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('expandHexColor called with non-hex value', hex)
    }
    return false
  }

  hex = hex.substr(1) // remove starting '#'
  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }

  return `#${hex}`
}

/**
 * Get red, green, and blue components from hex color code
 **/
export const hexToRgb = hex => {
  if (!isHexColor(hex)) {
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('hexToRgb called with non-hex value', hex)
    }
    return
  }

  hex = expandHexColor(hex)
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
      console.error('isDark called with non-hex value', hex)
    }
    return false
  }

  let [r, g, b] = hexToRgb(hex)
  const brightness = 0.21 * r + 0.72 * g + 0.07 * b

  return brightness <= 127.5
}
