/** ATOMS **/
interface Icon {
  color?: string
  onClick?: () => void
}

interface Letter {
  letter: string
  type: 'correct' | 'wrong' | 'default' | 'exists' | 'no-letter'
  className?: string
}

interface KeyCap {
  letter: string
  children?: React.ReactNode
  onClick: (letter: string) => void
  className?: string
}

interface Button {
  color: 'primary' | 'secondary'
  onClick: () => void
  children: React.ReactNode
  className?: string
}

interface ModalCard {
  show: boolean
  onClose: () => void
  children: React.ReactNode
}

interface Switch {
  checked: boolean
  onChange: (e: boolean) => void
  className?: string
}

/** MOLECULES **/
interface WordExample {
  word: Letter[]
  className?: string
}

interface KeyBoard {
  onClick: (letter: string) => void
  className?: string
}

/** ORGANISMS **/
interface HowToPlay {
  onExit: () => void
}

interface Header {
  onQuestionClick: () => void
  onStatsClick: () => void
}

interface ParamFn {
  reset: () => void
  tries: number
  victories: number
}
interface Board {
  wordToCheck: string
  onFoundWord: (props: ParamFn) => void
  onFinished: (props: ParamFn) => void
  onInit: () => void
}

interface Stats {
  tries: number
  victories: number
  onConfirm: () => void
  timer: string
}

type Length = 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
