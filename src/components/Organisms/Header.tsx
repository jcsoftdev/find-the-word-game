import { useEffect } from 'react'
import { useLocalStorage } from '../../hooks'
import { Question, Stats } from '../Atoms/Icons'
import Switch from '../Atoms/Switch'

const Header = ({ onQuestionClick, onStatsClick }: Header) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('isDarkMode', true)
  const switchDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <div className="grid place-items-center">
      <div className="w-[638px] bg-lightGrayColor dark:bg-bgColor dark:bg-opacity-5  py-5 px-5 rounded-2xl text-[#0008] dark:text-white flex items-center justify-between">
        <div className="flex-1">
          <Question onClick={onQuestionClick} />
        </div>
        <p className="text-4xl font-semibold flex-1 text-center">WORDLE</p>
        <div className="flex-1 flex items-center justify-end gap-4">
          <Stats onClick={onStatsClick} />
          <Switch
            checked={isDarkMode}
            onChange={() => {
              switchDarkMode()
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Header
