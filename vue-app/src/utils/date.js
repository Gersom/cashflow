function getCurrentMonthName (locale = 'es-ES') {
  const date = new Date()
  return date.toLocaleString(locale, { month: 'long' })
}

const getCurrentDayName = (locale = 'es-ES') => {
  const date = new Date()
  return date.toLocaleString(locale, { weekday: 'long' })
}

const getCurrentYear = (locale = 'es-ES') => {
  const date = new Date()
  return date.toLocaleString(locale, { year: 'numeric' })
}

export {
  getCurrentMonthName,
  getCurrentDayName,
  getCurrentYear
}