export function initials(name: string, max = 3) {
  return name
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, max)
    .toUpperCase()
}
