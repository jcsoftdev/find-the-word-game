import { words } from '../data'

export const getWord = (prevWords: string[]) => {
  const newWords = words.filter(word => !prevWords.includes(word))
  const word = newWords[Math.floor(Math.random() * newWords.length)]
  return word
}
