const fs = require('fs');
const path = require('path');

const PALETTE_FILE = path.join(__dirname, 'palette.json');
const PALETTES_FILE = path.join(__dirname, 'palettes.json');
const FONTS_FILE = path.join(__dirname, 'fonts.json');

function readPalette() {
  if (!fs.existsSync(PALETTE_FILE)) {
    fs.writeFileSync(PALETTE_FILE, JSON.stringify({
      primary: '#57534E',
      secondary: '#FFFFFF',
      accent: '#44403C',
      text: '#78716C',
      neutral: '#E7E5E4',
      name: 'Stone (Predeterminado)',
      id: 'default-stone',
      createdAt: new Date().toISOString()
    }, null, 2));
  }
  const data = fs.readFileSync(PALETTE_FILE, 'utf-8');
  return JSON.parse(data);
}

function writePalette(palette) {
  fs.writeFileSync(PALETTE_FILE, JSON.stringify(palette, null, 2));
}

function readPalettes() {
  if (!fs.existsSync(PALETTES_FILE)) {
    fs.writeFileSync(PALETTES_FILE, JSON.stringify([], null, 2));
  }
  const data = fs.readFileSync(PALETTES_FILE, 'utf-8');
  return JSON.parse(data);
}

function writePalettes(palettes) {
  fs.writeFileSync(PALETTES_FILE, JSON.stringify(palettes, null, 2));
}

function readFonts() {
  if (!fs.existsSync(FONTS_FILE)) {
    fs.writeFileSync(FONTS_FILE, JSON.stringify({
      body: 'Arial, sans-serif',
      title: 'Georgia, serif',
      headlineSize: 48,
      subtitleSize: 24,
      paragraphSize: 16
    }, null, 2));
  }
  const data = fs.readFileSync(FONTS_FILE, 'utf-8');
  return JSON.parse(data);
}

function writeFonts(fonts) {
  fs.writeFileSync(FONTS_FILE, JSON.stringify(fonts, null, 2));
}

function addPaletteEndpoints(app) {
  // Endpoint para guardar la paleta activa
  app.post('/api/palette', (req, res) => {
    const palette = req.body;
    if (!palette.name || palette.name.trim() === '') {
      return res.status(400).json({ message: 'El nombre de la paleta es obligatorio.' });
    }
    writePalette(palette);
    res.status(200).json({ message: 'Paleta guardada correctamente' });
  });

  // Endpoint para obtener la paleta activa
  app.get('/api/palette', (req, res) => {
    const palette = readPalette();
    res.json(palette);
  });

  // Endpoint para obtener todas las paletas personalizadas
  app.get('/api/palettes', (req, res) => {
    const palettes = readPalettes();
    res.json(palettes);
  });

  // Endpoint para agregar una nueva paleta personalizada
  app.post('/api/palettes', (req, res) => {
    const palette = req.body;
    if (!palette.name || palette.name.trim() === '') {
      return res.status(400).json({ message: 'El nombre de la paleta es obligatorio.' });
    }
    palette.id = palette.id || `palette-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    palette.createdAt = palette.createdAt || new Date().toISOString();
    const palettes = readPalettes();
    palettes.push(palette);
    writePalettes(palettes);
    res.status(201).json({ message: 'Paleta guardada correctamente', palette });
  });
}

function addFontEndpoints(app) {
  app.get('/api/fonts', (req, res) => {
    const fonts = readFonts();
    res.json(fonts);
  });

  app.post('/api/fonts', (req, res) => {
    const fonts = req.body;
    if (!fonts.body || !fonts.title) {
      return res.status(400).json({ message: 'Faltan fuentes.' });
    }
    writeFonts(fonts);
    res.status(200).json({ message: 'Fuentes guardadas correctamente' });
  });
}

module.exports = { addPaletteEndpoints, addFontEndpoints }; 