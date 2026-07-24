// Best-effort guess at a company's domain from its display name, so the
// Clearbit Logo API (https://logo.clearbit.com/{domain}) has something to
// look up automatically without requiring the user to enter a domain.
// This is intentionally approximate — CompanyLogo always falls back to the
// initial-letter avatar if the guessed logo fails to load.
export function guessCompanyDomain(company = '') {
  const cleaned = company
    .toLowerCase()
    .replace(/\b(inc|llc|ltd|co|corp|corporation|company|labs|technologies|tech)\b/g, '')
    .replace(/[^a-z0-9]/g, '')
    .trim()

  if (!cleaned) return null
  return `${cleaned}.com`
}

export function clearbitLogoUrl(company) {
  const domain = guessCompanyDomain(company)
  return domain ? `https://logo.clearbit.com/${domain}` : null
}
