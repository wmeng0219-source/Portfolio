import '@testing-library/jest-dom/vitest'

if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })
}

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (callback) => window.setTimeout(callback, 16)
}

if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = (handle) => window.clearTimeout(handle)
}

if (!window.scrollTo) {
  window.scrollTo = () => {}
}

const createStorage = () => {
  const store = new Map()

  return {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => {
      store.set(String(key), String(value))
    },
    removeItem: (key) => {
      store.delete(String(key))
    },
    clear: () => {
      store.clear()
    },
  }
}

if (!window.localStorage || typeof window.localStorage.setItem !== 'function') {
  Object.defineProperty(window, 'localStorage', {
    value: createStorage(),
    configurable: true,
  })
}

if (!window.sessionStorage || typeof window.sessionStorage.setItem !== 'function') {
  Object.defineProperty(window, 'sessionStorage', {
    value: createStorage(),
    configurable: true,
  })
}
