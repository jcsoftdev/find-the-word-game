import { createPortal } from 'react-dom'

const ModalCard = ({ show, onClose, children }: ModalCard) => {
  const showHideClassName = show ? ' grid' : ' hidden'

  return createPortal(
    <div
      className={`h-screen w-screen absolute top-0 place-items-center p-14 bg-customWhite bg-opacity-90 dark:bg-opacity-90 dark:bg-darkBlueColor box-border overflow-y-auto ${showHideClassName}`}
      onClick={onClose}
    >
      <section
        className="bg-customWhite dark:bg-darkBlueColor dark:text-white px-10 py-6 border-[1px] border-black dark:border-[#939B9F] rounded-xl max-w-[546px] box-border text-lg"
        onClick={e => {
          e.stopPropagation()
        }}
      >
        {children}
      </section>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  )
}

export default ModalCard
