const Letter = ({ letter, type, className = '' }: Letter) => {
  let bgColor = ''

  switch (type) {
    case 'correct':
      bgColor = 'bg-greenColor border-greenColor'
      break
    case 'wrong':
      bgColor = 'bg-grayColor border-grayColor'
      break

    case 'exists':
      bgColor = 'bg-yellowColor border-yellowColor'
      break
    case 'no-letter':
      bgColor =
        'bg-bgAlternativeColor border-bgAlternativeColor border-opacity-30 bg-opacity-30 dark:bg-opacity-20 dark:border-opacity-20 dark:border-bgAlternativeColor'
      break
    default:
      bgColor =
        'bg-white border-black dark:bg-darkBlueColor dark:border-grayColor'
      break
  }

  return (
    <div
      className={`${bgColor} border-[1px] rounded-[5px] w-[76px] h-[76px] grid place-items-center text-black dark:text-white ${className} `}
    >
      <p className="m-0 text-[35px] font-extrabold">{letter}</p>
    </div>
  )
}

export default Letter
