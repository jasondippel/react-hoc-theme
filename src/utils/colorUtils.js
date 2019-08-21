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
export const hexToRgb = hex => {
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

/**
 * Get hex color code from red, green, and blue components
 **/
export const rgbToHex = (r, g, b) => {
  if (r > 255 || g > 255 || b > 255 || r < 0 || g < 0 || b < 0) {
    // eslint-disable-next-line no-console
    console.error('rgbToHex called with non-rgb value', `[${r}, ${g}, ${b}]`)
    return
  }

  let rHex = Number(r).toString(16)
  let gHex = Number(g).toString(16)
  let bHex = Number(b).toString(16)

  rHex = rHex.length < 2 ? '0' + rHex : rHex
  gHex = gHex.length < 2 ? '0' + gHex : gHex
  bHex = bHex.length < 2 ? '0' + bHex : bHex

  return `#${rHex}${gHex}${bHex}`
}

/**
 * Given an RGB color (as 3 distinct values), returns an array of corresponding
 * HSL values
 *
 * Source: https://stackoverflow.com/questions/3732046/how-do-you-get-the-hue-of-a-xxxxxx-colour
 **/
export const rgbToHsl = (r, g, b) => {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h,
    s,
    l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  h = h * 360
  s = s * 100
  l = l * 100

  return [h, s, l]
}

/**
 * part of transforming hsl to rgb
 *
 * Source: https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
 **/
const hue2rgb = (p, q, t) => {
  if (t < 0) t += 1
  if (t > 1) t -= 1
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
  return p
}

/**
 * Given the separated values of an HSL defined color, returns an array of
 * corresponding RGB values
 *
 * Source: https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
 **/
export const hslToRgb = (h, s, l) => {
  h /= 360
  s /= 100
  l /= 100

  let r, g, b

  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

/**
 * Given a hex value, returns an array of HSL values
 **/
export const hexToHsl = hex => rgbToHsl(...hexToRgb(hex))

/**
 * Given the separated values of an HSL defined color, returns the HEX color
 * code
 **/
export const hslToHex = (h, s, l) => rgbToHex(...hslToRgb(h, s, l))

/**
 * Ensures RGB values are within acceptable range (0 --> 255); Use when
 * manipultating RGB values and want to ensure it results in a valid RGB color
 **/
export const constrainRgb = (r, g, b) => {
  r = r > 255 ? 255 : r
  r = r < 0 ? 0 : r

  g = g > 255 ? 255 : g
  g = g < 0 ? 0 : g

  b = b > 255 ? 255 : b
  b = b < 0 ? 0 : b

  return [r, g, b]
}

/**
 * Returns true if the given color is dark, false if not
 **/
export const isDark = hex => {
  if (!isHexColor(hex)) {
    // eslint-disable-next-line no-console
    console.error('isDark called with non-hex value')
    return false
  }

  let [r, g, b] = hexToRgb(hex)

  // equation from http://alienryderflex.com/hsp.html
  const brightness = Math.sqrt(
    0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b),
  )

  return brightness <= 127.5
}
