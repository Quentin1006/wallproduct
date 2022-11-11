import { useDebounce } from "../../hooks/useDebounce"
import { Fragment } from "react"
import { Filter } from "typings"

export type TextInputFilterProps = {
  filterState: Filter
  name: string
  onUpdateFilter: (label: string, value: string) => void
}

const TextInputFilter = ({ filterState, name, onUpdateFilter }: TextInputFilterProps) => {
  console.log("rerendering input")

  const { debounceValue, updateDebounce } = useDebounce({
    initialState: "",
    delay: 200,
    onUpdateDebounce: onUpdateFilter,
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDebounce(name, e.target.value)
  }

  return (
    <Fragment key={name}>
      <label htmlFor={name}>{name} : </label>
      <input name={name} type="text" value={debounceValue} onChange={onChange} />
    </Fragment>
  )
}

export default TextInputFilter
