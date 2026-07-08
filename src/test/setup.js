import '@testing-library/jest-dom/vitest'
import { beforeEach } from 'vitest'

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

const localStorageShim = createStorage()
const sessionStorageShim = createStorage()

if (!window.localStorage || typeof window.localStorage.setItem !== 'function') {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageShim,
    configurable: true,
  })
}

if (!window.sessionStorage || typeof window.sessionStorage.setItem !== 'function') {
  Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageShim,
    configurable: true,
  })
}

beforeEach(() => {
  window.localStorage.clear()
  window.sessionStorage.clear()
})
