const KeyCap = ({ children, onClick, className, letter }: KeyCap) => {
  return (
    <div
      className={`bg-keyboardGrayColor dark:bg-keyboardGrayColorRevert text-[#56575E] dark:text-white rounded-[5px] text-[18px] font-semibold w-[45px] h-[51px] grid place-items-center select-none cursor-pointer hover:bg-keyboardDarkGrayColor dark:hover:bg-keyboardDarkGrayColor hover:text-white active:scale-110 transition-all ${className}`}
      onClick={() => {
        onClick(letter)
      }}
    >
      {children || letter}
    </div>
  )
}

export default KeyCap
