import { useState } from 'react'
import { Button, ModalCard } from '../Atoms'
import { WordExample } from '../Molecules'

const wordCats: WordExample['word'] = [
  { letter: 'G', type: 'correct' },
  { letter: 'A', type: 'default' },
  { letter: 'T', type: 'default' },
  { letter: 'O', type: 'default' },
  { letter: 'S', type: 'default' }
]

const wordVowel: WordExample['word'] = [
  { letter: 'V', type: 'default' },
  { letter: 'O', type: 'default' },
  { letter: 'C', type: 'exists' },
  { letter: 'A', type: 'default' },
  { letter: 'L', type: 'default' }
]

const wordSing: WordExample['word'] = [
  { letter: 'C', type: 'default' },
  { letter: 'A', type: 'default' },
  { letter: 'N', type: 'default' },
  { letter: 'T', type: 'default' },
  { letter: 'O', type: 'wrong' }
]

const HowToPlay = ({ onExit }: HowToPlay) => {
  const [showModal, setShowModal] = useState(true)

  const onClose = () => {
    setShowModal(false)
    onExit()
  }

  return (
    <ModalCard show={showModal} onClose={onClose}>
      <div className="">
        <h2 className="text-4xl font-extrabold text-center mt-7">Cómo jugar</h2>
        <div className="mt-8 grid gap-3">
          <p>Adivina la palabra oculta en cinco intentos.</p>
          <p>Cada intento debe ser una palabra válida de 5 letras.</p>
          <p>
            {' '}
            Después de cada intento el color de las letras cambia para mostrar
            qué tan cerca estás de acertar la palabra.
          </p>
        </div>
        <p className="font-bold mt-4">Ejemplos</p>
        <WordExample word={wordCats} className="mt-6" />
        <p className="mt-5">
          La letra <strong>G</strong> está en la palabra y en la posición
          correcta.
        </p>

        <WordExample word={wordVowel} className="mt-6" />

        <p className="mt-5">
          La letra <strong>C </strong> está en la palabra pero en la posición
          incorrecta.
        </p>

        <WordExample word={wordSing} className="mt-6" />

        <p className="mt-5">
          La letra <strong>O</strong> no está en la palabra.
        </p>

        <p className="mt-5">
          Puede haber letras repetidas. Las pistas son independientes para cada
          letra.
        </p>

        <p className="mt-5 text-center">¡Una palabra nueva cada 5 minutos!</p>
      </div>
      <div className="grid place-items-center mt-9">
        <Button color="primary" onClick={onClose}>
          Empezar
        </Button>
      </div>
    </ModalCard>
  )
}

export default HowToPlay
