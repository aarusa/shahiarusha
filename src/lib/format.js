export const pad = (n, len = 2) => String(n).padStart(len, '0')

export const fmtDate = (iso) => iso.replaceAll('-', '.')

export const yearOf = (value) => Number(String(value).match(/\d{4}/)?.[0] ?? 0)

export function hash(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}
