import { useState, useEffect, useCallback } from 'react'

function resolveTheme(t) {
  return t === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : t
}

export function useTheme() {
  const [theme, setThemeState] = useState(() => localStorage.getItem('denc-theme') || 'dark')

  const applyTheme = useCallback(t => {
    document.documentElement.setAttribute('data-theme', resolveTheme(t))
  }, [])

  const setTheme = useCallback(t => {
    setThemeState(t)
    localStorage.setItem('denc-theme', t)
    applyTheme(t)
  }, [applyTheme])

  useEffect(() => { applyTheme(theme) }, [])

  useEffect(() => {
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => applyTheme('system')
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme, applyTheme])

  return { theme, setTheme }
}
