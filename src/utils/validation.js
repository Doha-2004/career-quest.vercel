// Validates an optional URL field. Empty values are always considered valid
// since the field is optional — only non-empty, malformed values should fail.
export function isValidUrl(value) {
  if (!value || !value.trim()) return true
  try {
    const url = new URL(value.trim())
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}
