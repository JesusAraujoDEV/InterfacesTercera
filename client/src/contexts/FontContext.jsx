import { createContext, useContext, useEffect, useState } from "react"

const defaultFonts = {
  body: "Arial, sans-serif",
  title: "Georgia, serif",
  headlineSize: 48,
  subtitleSize: 24,
  paragraphSize: 16
}

const FontContext = createContext({
  fonts: defaultFonts,
  setFonts: () => {},
  applyFonts: () => {},
})

export function FontProvider({ children }) {
  const [fonts, setFonts] = useState(() => {
    const stored = localStorage.getItem("activeFonts")
    return stored ? JSON.parse(stored) : defaultFonts
  })

  // Aplica las fuentes y tamaños a las variables CSS y al body
  const applyFonts = (f) => {
    const root = document.documentElement
    root.style.setProperty("--font-body", f.body)
    root.style.setProperty("--font-title", f.title)
    root.style.setProperty("--font-size-headline", f.headlineSize + "px")
    root.style.setProperty("--font-size-subtitle", f.subtitleSize + "px")
    root.style.setProperty("--font-size-paragraph", f.paragraphSize + "px")
    document.body.style.fontFamily = f.body
    // Aplica a headings globalmente
    const styleId = "dynamic-font-headings"
    let style = document.getElementById(styleId)
    if (!style) {
      style = document.createElement("style")
      style.id = styleId
      document.head.appendChild(style)
    }
    style.innerHTML = `h1, h2, h3, h4, h5, h6 { font-family: ${f.title} !important; }`;
  }

  // Sincronizar con backend
  useEffect(() => {
    applyFonts(fonts)
    localStorage.setItem("activeFonts", JSON.stringify(fonts))
    fetch('http://localhost:3001/api/fonts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fonts)
    })
  }, [fonts])

  useEffect(() => {
    // Al iniciar, cargar del backend
    fetch('http://localhost:3001/api/fonts')
      .then(res => res.json())
      .then(data => {
        setFonts(data)
        applyFonts(data)
        localStorage.setItem("activeFonts", JSON.stringify(data))
      })
      .catch(() => {
        // fallback localStorage
        const stored = localStorage.getItem("activeFonts")
        if (stored) {
          const f = JSON.parse(stored)
          setFonts(f)
          applyFonts(f)
        } else {
          applyFonts(defaultFonts)
        }
      })
  }, [])

  return (
    <FontContext.Provider value={{ fonts, setFonts, applyFonts }}>
      {children}
    </FontContext.Provider>
  )
}

export function useFont() {
  return useContext(FontContext)
} 