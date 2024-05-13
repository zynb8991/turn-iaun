import React from 'react'

const SelectBox = ({name, options, selected, ...props}) => {
  return (
    <select name={name} className="select select-bordered w-full bg-bg-gray text-neutral-800 text-base placeholder:text-neutral-500" {...props}>
        {options.map((opt, index) => {
          if(opt.optGroup) {
            const newOptGroup = <optgroup key={index} label={opt.title}>
              {opt.optGroup.map((sec, key) => <option key={key} value={sec.value} selected={sec.value === selected ? true : false} >{sec.title}</option>)}
            </optgroup>

            return newOptGroup;
          }
          return <option key={index} value={opt.value} selected={opt.value === selected ? true : false} >{opt.title}</option>
        })}
    </select>
  )
}

export default SelectBox