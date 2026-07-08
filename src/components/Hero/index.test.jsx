import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '../../context/LanguageContext'
import Hero from './index'

test('renders hero content in test environment', () => {
  render(
    <LanguageProvider>
      <Hero />
    </LanguageProvider>,
  )

  expect(screen.getByRole('heading', { level: 1, name: 'Meng Wen' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: '查看案例' })).toHaveAttribute('href', '#portfolio')
})
