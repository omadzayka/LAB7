import { useEffect, useState } from 'react'

function readValue(key, initialValue) {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? initialValue : JSON.parse(raw)
  } catch {
    return initialValue // corrupted JSON or storage unavailable
  }
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readValue(key, initialValue))

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage full or blocked: keep working in memory
    }
  }, [key, value])

  return [value, setValue]
}
