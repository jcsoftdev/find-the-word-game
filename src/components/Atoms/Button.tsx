const Button = ({ color, onClick, children, className = '' }: Button) => {
  let colorClass = ''

  switch (color) {
    case 'primary':
      colorClass = 'bg-greenColor text-white'
      break
    case 'secondary':
      colorClass = 'bg-yellowColor text-white'
      break
    default:
      colorClass = 'bg-greenColor'
      break
  }
  return (
    <button
      className={`rounded-[5px] px-8 py-2 text-center font-medium text-2xl ${colorClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
