const getLocalStorage = (key) => {
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : null
}

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const removeLocalStorage = (key) => {
  localStorage.removeItem(key)
}

export { getLocalStorage, setLocalStorage, removeLocalStorage }