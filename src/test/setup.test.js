test('localStorage and sessionStorage can store values within a test', () => {
  window.localStorage.setItem('language', 'en')
  window.sessionStorage.setItem('section', 'hero')

  expect(window.localStorage.getItem('language')).toBe('en')
  expect(window.sessionStorage.getItem('section')).toBe('hero')
})

test('localStorage and sessionStorage are reset before each test', () => {
  expect(window.localStorage.getItem('language')).toBeNull()
  expect(window.sessionStorage.getItem('section')).toBeNull()
})
