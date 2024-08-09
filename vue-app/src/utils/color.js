import chroma from 'chroma-js';

export function getContrastColor(color) {
  try {
    const backgroundColor = chroma(color);
    return chroma.contrast(backgroundColor, 'black') > 4.5 ? 'black' : 'white';
  } catch (e) {
    console.error('Color no válido:', color);
    return 'black';
  }
}