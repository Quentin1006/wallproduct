import { Fragment, useRef, useState } from "react"
import { Filter } from "typings"

export type TextInputFilterProps = {
  filterState: Filter
  name: string
  onUpdateFilter: (label: string, value: string) => void
}

const TextInputFilter = ({ filterState, name, onUpdateFilter }: TextInputFilterProps) => {
  const [tmpValue, setTmpValue] = useState("")
  let timeoutId = useRef<ReturnType<typeof setTimeout>>()

  console.log("rerendering input")

  const onChange = (e: any) => {
    clearTimeout(timeoutId.current)
    setTmpValue(e.target.value)
    timeoutId.current = setTimeout(() => {
      onUpdateFilter(name, e.target.value)
    }, 500)
  }

  return (
    <Fragment key={name}>
      <label htmlFor={name}>{name} : </label>
      <input name={name} type="text" value={tmpValue} onChange={onChange} />
    </Fragment>
  )
}

export default TextInputFilter
