import { createContext, useContext, useEffect, useState } from "react"

const defaultPalette = {
  primary: "#57534E",
  secondary: "#FFFFFF",
  accent: "#44403C",
  text: "#78716C",
  neutral: "#E7E5E4"
}

const ColorContext = createContext({
  palette: defaultPalette,
  setPalette: () => {},
  applyPalette: () => {},
})

export function ColorProvider({ children }) {
  const [palette, setPalette] = useState(() => {
    const stored = localStorage.getItem("activePalette")
    return stored ? JSON.parse(stored) : defaultPalette
  })

  // Aplica la paleta a las variables CSS
  const applyPalette = (pal) => {
    const root = document.documentElement
    root.style.setProperty("--color-primary", pal.primary)
    root.style.setProperty("--color-secondary", pal.secondary)
    root.style.setProperty("--color-accent", pal.accent)
    root.style.setProperty("--color-text", pal.text)
    root.style.setProperty("--color-neutral", pal.neutral)
  }

  // Al iniciar, obtener la paleta activa del backend
  useEffect(() => {
    fetch('http://localhost:3001/api/palette')
      .then(res => res.json())
      .then(data => {
        setPalette(data)
        applyPalette(data)
        localStorage.setItem("activePalette", JSON.stringify(data))
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    applyPalette(palette)
    localStorage.setItem("activePalette", JSON.stringify(palette))
  }, [palette])

  return (
    <ColorContext.Provider value={{ palette, setPalette, applyPalette }}>
      {children}
    </ColorContext.Provider>
  )
}

export function useColor() {
  return useContext(ColorContext)
} 