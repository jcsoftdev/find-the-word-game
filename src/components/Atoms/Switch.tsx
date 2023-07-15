import { useId } from 'react'
const Switch = ({ checked, onChange, className }: Switch) => {
  const id = useId()
  return (
    <label
      htmlFor={id}
      className={`bg-gradient-to-b  w-[78px] h-[38px] rounded-full p-1 select-none transition-all
          relative

         from-[#50bfb1]
         to-[#F1e2a9]

         dark:from-[#203364] dark:to-[#a5bef2]
         ${className} 
      `}
    >
      <div
        className={`h-5/6 transition-all aspect-square bg-gradient-to-r dark:from-[#C8D7FF] dark:to-[#DCF0FF]  rounded-full relative translate-y-[-50%] top-2/4 ${
          !checked ? 'left-0' : 'left-[100%] translate-x-[-100%]'
        }`}
      >
        <div
          className={`h-full aspect-square bg-gradient-to-r dark:from-[#CDE4FF] dark:to-[#D6E9FF]  rounded-full  p-1
          from-[#FFBF24]
          to-[#F4924B]
          `}
        ></div>
      </div>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        className="hidden"
        onChange={e => {
          onChange(e.target.checked)
        }}
      />
    </label>
  )
}

export default Switch
