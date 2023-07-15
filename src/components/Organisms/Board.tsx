import { Fragment, useEffect } from 'react'
import { useLocalStorage } from '../../hooks'
import {
  ATTEMPT_NUMBER,
  BOARD_LETTERS,
  CHALLENGE_COMPLETED,
  CHALLENGE_TRIES,
  CURRENT_INDEX_OF_WORD,
  INIT_GAME
} from '../../utils/consts'
import { Letter } from '../Atoms'
import { QwertyKeyboard } from '../Molecules'

const genBoardBase = (length: number): Letter[][] => {
  return Array.from({ length }).map(() =>
    Array.from({ length }, (): Letter => {
      return {
        letter: '',
        type: 'no-letter'
      }
    })
  )
}

const gridCols = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12'
}

const Board = ({ wordToCheck, onFinished, onFoundWord, onInit }: Board) => {
  const length = wordToCheck.length as Length
  const [currentIndexLetter, setCurrentIndexLetter] = useLocalStorage(
    CURRENT_INDEX_OF_WORD,
    0
  )
  const [attempt, setAttempt] = useLocalStorage(ATTEMPT_NUMBER, 1)
  const [boardLetters, setBoardLetters] = useLocalStorage<Letter[][]>(
    BOARD_LETTERS,
    genBoardBase(length)
  )
  const wordArray = wordToCheck.toUpperCase().split('')
  const [isFirstTime, setIsFirstTime] = useLocalStorage(INIT_GAME, true)
  const [completedWords, setCompletedWords] = useLocalStorage<number>(
    CHALLENGE_COMPLETED,
    0
  )
  const [tries, setTries] = useLocalStorage<number>(CHALLENGE_TRIES, 0)

  const resetBoard = () => {
    setAttempt(1)
    setCurrentIndexLetter(0)
    setBoardLetters(genBoardBase(length))
    setIsFirstTime(true)
  }

  useEffect(() => {
    const isOkWord = boardLetters.some(wordArray => {
      return wordArray.every(({ type }) => type === 'correct')
    })

    if (isOkWord) {
      const newCompletedWords = completedWords + 1
      const newTries = tries + 1
      setTries(newTries)
      setCompletedWords(newCompletedWords)
      onFoundWord({
        reset: resetBoard,
        tries: newTries,
        victories: newCompletedWords
      })
      resetBoard()
    }

    if (attempt > length) {
      const newTries = tries + 1

      setTries(newTries)
      onFinished({
        reset: resetBoard,
        tries: newTries,
        victories: completedWords
      })
      resetBoard()
    }
  }, [boardLetters])

  useEffect(() => {
    const isCompletedBoard = boardLetters.every(wordArray => {
      return wordArray.every(({ type }) => type !== 'no-letter')
    })
    if (isCompletedBoard) {
      resetBoard()
    }
  }, [wordToCheck])

  const setNextLetter = (l: string) => {
    if (isFirstTime) {
      onInit()
      setIsFirstTime(false)
    }
    const letter = l.toUpperCase()

    const newBoardLetters = [...boardLetters]

    let type: Letter['type'] = 'no-letter'

    if (letter === wordArray[currentIndexLetter]) {
      type = 'correct'
    } else if (wordArray.includes(letter)) {
      type = 'exists'
    } else {
      type = 'wrong'
    }

    if (attempt > length) {
      resetBoard()
      onFinished({ reset: resetBoard, tries, victories: completedWords })
      return
    }

    newBoardLetters[attempt - 1][currentIndexLetter] = {
      letter,
      type
    }

    if (currentIndexLetter === length - 1) {
      setAttempt(attempt + 1)
      setCurrentIndexLetter(0)
    } else {
      setCurrentIndexLetter(currentIndexLetter + 1)
    }
    setBoardLetters(newBoardLetters)
  }

  const classForContainer = gridCols[`${length}`]

  return (
    <>
      <div className={`inline-grid gap-3 select-none ${classForContainer}`}>
        {boardLetters.map((wordArray, index) => {
          return (
            <Fragment key={`${wordArray[index].letter}${index}`}>
              {wordArray.map(({ letter, type }, index) => {
                return (
                  <Letter
                    letter={letter}
                    type={type}
                    key={letter + index}
                    className="text-white"
                  />
                )
              })}
            </Fragment>
          )
        })}
      </div>
      <QwertyKeyboard className="mt-14" onClick={setNextLetter} />
    </>
  )
}

export default Board
