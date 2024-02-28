import { useTheme } from '../../services/ThemeContext'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' && (
        <span>
          <MdDarkMode />
        </span>
      )}
      {theme === 'dark' && (
        <span className='dark:text-white'>
          <MdLightMode />
        </span>
      )}
    </button>
  )
}
