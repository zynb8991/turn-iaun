'use client'

const Input = ({children, type, name, placeholder, ...props}) => {
  return (
    <label className="input input-md h-55 input-bordered flex items-center gap-2 w-full bg-bg-gray">
        {children}
        <input  type={type} name={name} placeholder={placeholder} className="grow bg-bg-gray text-neutral-800 text-base placeholder:text-neutral-500" {...props} />
    </label>
 )
}

export default Input