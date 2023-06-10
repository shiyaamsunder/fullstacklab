import { useState } from 'react'

import '../styles/Input.css'
import useOuterClick from '../useOuterClick'

const InputWrapper = ({ name, labelText, children }) => {
  return (
    <div className='inputWrapper'>
      <label htmlFor={name} className='inputLabel'>
        {labelText}
      </label>
      {children}
    </div>
  )
}

export const Input = ({ labelText, name, type, ...rest }) => {
  return (
    <InputWrapper labelText={labelText} name={name}>
      <input type={type} name={name} id={name} className='input' {...rest} />
    </InputWrapper>
  )
}

Input.Combobox = ({ labelText, name, options = [], ...rest }) => {
  return (
    <InputWrapper labelText={labelText} name={name}>
      <select
        className='input'
        name={name}
        id={name}
        {...rest}
        defaultChecked={options[0].text}
      >
        {options.map(({ value, text }) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </InputWrapper>
  )
}

Input.AutoComplete = function ({
  labelText,
  name,
  options = [],
  searchValue,
  onOptionClick,
  ...rest
}) {
  const [display, setDisplay] = useState(false)

  const open = () => {
    setDisplay(true)
  }

  const close = () => {
    setDisplay(false)
  }
  const innerRef = useOuterClick(close)

  const handleOptionSelect = (v) => {
    onOptionClick(v.name)
    close()
  }

  return (
    <InputWrapper labelText={labelText} name={name}>
      <input
        ref={innerRef}
        type='text'
        name={name}
        id={name}
        value={searchValue}
        className='input'
        onFocus={open}
        {...rest}
      />
      {display && (
        <div className='autocomplete'>
          {options
            .filter(
              ({ name }) =>
                name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
            )
            .map((v, i) => {
              return (
                <div
                  className='option'
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleOptionSelect(v)}
                  onClick={() => handleOptionSelect(v)}
                  key={i}
                >
                  {v.name}
                </div>
              )
            })}
        </div>
      )}
    </InputWrapper>
  )
}
