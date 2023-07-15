import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Board, Header, HowToPlay, Stats } from './components/Organisms'
import { useCounterDown, useIsFocused, useLocalStorage } from './hooks'
import {
  CHALLENGE_COMPLETED,
  CHALLENGE_TRIES,
  IS_FIRST_TIME,
  USED_WORDS,
  WORD_KEY
} from './utils/consts'
import { getWord } from './utils/word'

function App() {
  const [isFirstTime, setIsFirstTime] = useLocalStorage(IS_FIRST_TIME, true)
  const [showHowToPlay, setShowHowToPlay] = useState(isFirstTime)
  const [showReport, setShowReport] = useState(false)
  const [value, setValue] = useLocalStorage(WORD_KEY, getWord([]))
  const [usedWords, setUsedWords] = useLocalStorage<string[]>(USED_WORDS, [
    value
  ])
  const { getMinutesAndSeconds, resetCounter, counter } = useCounterDown({
    initialValue: 5 * 60
  })
  const [tries, setTries] = useLocalStorage(CHALLENGE_TRIES, 0)
  const [completed, setCompleted] = useLocalStorage(CHALLENGE_COMPLETED, 0)
  const fnReset = useRef<() => void>(() => {})
  const isFocused = useIsFocused()

  const setNextWord = () => {
    const newWord = getWord(usedWords)
    if (!newWord) {
      alert('Ya usaste todas las palabras')
      return
    }
    setValue(newWord)
    setUsedWords([...usedWords, newWord])
  }

  useEffect(() => {
    if (counter <= 0 && isFocused) {
      setNextWord()
      fnReset.current()
    }
  }, [counter])

  return (
    <div data-theme-name="dark" className="">
      <Header
        onQuestionClick={() => setShowHowToPlay(true)}
        onStatsClick={() => setShowReport(true)}
      />
      <div className="grid place-items-center mt-[87px]">
        <Board
          wordToCheck={value}
          onFinished={({ reset, tries, victories }) => {
            setTries(tries)
            setCompleted(victories)
            setShowReport(true)
            fnReset.current = reset
          }}
          onFoundWord={({ reset, tries, victories }) => {
            fnReset.current = reset
            setTries(tries)
            setCompleted(victories)
            setShowReport(true)
            resetCounter(0) // this charges another word
          }}
          onInit={() => {
            fnReset.current()
            resetCounter(5 * 60)
          }}
        />
      </div>

      {showHowToPlay && (
        <HowToPlay
          onExit={() => {
            setShowHowToPlay(false), setIsFirstTime(false)
          }}
        />
      )}
      {showReport && (
        <Stats
          onConfirm={() => {
            setShowReport(false)
          }}
          tries={tries}
          victories={completed}
          timer={getMinutesAndSeconds()}
        />
      )}
    </div>
  )
}

export default App
