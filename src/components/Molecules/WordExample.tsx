import { Letter } from '../Atoms'

const WordExample = ({ word, className = '' }: WordExample) => {
  return (
    <div className={`flex gap-3 ${className}`}>
      {word.map(({ letter, type }, index) => {
        return (
          <Letter key={letter + type + index} letter={letter} type={type} />
        )
      })}
    </div>
  )
}

export default WordExample
