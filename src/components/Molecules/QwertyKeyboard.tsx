import { useState } from 'react'
import { KeyCap } from '../Atoms'
import { Delete } from '../Atoms/Icons'

const QwertyKeyboard = ({ onClick, className }: KeyBoard) => {
  const [letters] = useState([
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE']
  ])

  return (
    <div
      className={`inline-grid gap-3 bg-bgColor bg-opacity-30 dark:bg-opacity-5 py-9 px-5 rounded-2xl ${className}`}
    >
      {letters.map((row, index) => {
        return (
          <div
            className={`flex gap-3 ${index === 1 && 'pl-12'} ${
              index === 0 && 'pl-8'
            }`}
            key={index}
          >
            {row.map(letter => {
              const isEnter = letter === 'ENTER'
              const isDelete = letter === 'DELETE'
              const classOption = isEnter || isDelete ? 'w-[72px]' : ''

              return (
                <KeyCap
                  onClick={letter => {
                    if (isEnter) {
                      // TODO: add enter functionality
                      return
                    }
                    if (isDelete) {
                      // TODO: add delete functionality
                      return
                    }
                    onClick(letter)
                  }}
                  className={classOption}
                  letter={letter}
                  key={letter}
                >
                  {isDelete ? <Delete /> : letter}
                </KeyCap>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default QwertyKeyboard
