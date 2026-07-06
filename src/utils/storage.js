// Thin, defensive wrapper around localStorage so a corrupt value or a
// restricted environment (private browsing, SSR) never crashes the app.

export function loadFromStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch (err) {
    console.warn(`Could not read "${key}" from localStorage`, err)
    return fallback
  }
}

export function saveToStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (err) {
    console.warn(`Could not write "${key}" to localStorage`, err)
    return false
  }
}

export function removeFromStorage(key) {
  try {
    window.localStorage.removeItem(key)
  } catch (err) {
    console.warn(`Could not remove "${key}" from localStorage`, err)
  }
}
