import chroma from 'chroma-js'

export function getContrastColor (color) {
  try {
    const backgroundColor = chroma(color)
    return chroma.contrast(backgroundColor, 'black') > 4.5 ? '#282a36' : '#dbdfe9'
  } catch (e) {
    console.error('Invalid Color:', color)
    return 'black'
  }
}