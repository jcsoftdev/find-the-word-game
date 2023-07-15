import { useState } from 'react'
import { Button } from '../Atoms'
import ModalCard from '../Atoms/ModalCard'

const Stats = ({ onConfirm, tries, victories, timer }: Stats) => {
  const [showModal] = useState(true)

  const onClose = () => {
    // setShowModal(false)
    onConfirm()
  }

  return (
    <ModalCard show={showModal} onClose={onClose}>
      <h2 className="text-4xl font-extrabold text-center mt-7">Estadísticas</h2>
      <div className="mt-11 grid gap-60 grid-cols-2">
        <div>
          <p className="text-4xl font-extrabold text-center">{tries}</p>
          <p className="mt-4">Jugadas</p>
        </div>
        <div>
          <p className="text-4xl font-extrabold text-center">{victories}</p>
          <p className="mt-4">Victorias</p>
        </div>
      </div>
      <div className="mt-14 text-center">
        <p className="">SIGUIENTE PALABRA</p>
        <p className="font-bold text-2xl">{timer}</p>
        <Button color="primary" onClick={onClose} className="mt-8">
          Aceptar
        </Button>
      </div>
    </ModalCard>
  )
}

export default Stats
