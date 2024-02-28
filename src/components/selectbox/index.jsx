import React from 'react'

const SelectBox = ({name, options, selected, ...props}) => {
  console.log(options);
  return (
    <select name={name} className="select select-bordered w-full bg-bg-gray text-neutral-800 text-base placeholder:text-neutral-500" {...props}>
        {options.map((opt, index) => {
          // if(typeof opt === 'object') {
          //   const optGroup = <optgroup key={index} label={opt.title}>
          //     {opt.sections.map((sec, key) => <option key={key} value={sec[0]} selected={sec[0] === selected ? true : false} >{sec[1]}</option>)}
          //   </optgroup>

          //   return optGroup;
          // }
          return <option key={index} value={opt[0]} selected={opt[0] === selected ? true : false} >{opt[1]}</option>
        })}
    </select>
  )
}

export default SelectBox