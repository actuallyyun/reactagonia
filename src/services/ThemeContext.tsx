import {
  ReactNode,
  useContext,
  useState,
  createContext,
  useEffect
} from 'react'

export type ThemeContextType = {
  theme: string
  toggleTheme: () => void
}
const themeInStorage = localStorage.getItem('theme')

const ThemeContext = createContext<ThemeContextType>({
  theme: themeInStorage ? JSON.parse(themeInStorage) : 'light',
  toggleTheme: () => {}
})

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<string>(
    themeInStorage ? JSON.parse(themeInStorage) : 'light'
  )

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme))
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
