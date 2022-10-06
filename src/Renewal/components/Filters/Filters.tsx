import { observer } from "mobx-react-lite"
import { Fragment, useEffect, useRef, useState } from "react"

import type { FilterRecord } from "../../typings"
import TextInputFilter from "./TextInputFilter"

type FilterProps = {
  filters: FilterRecord
  updateFilter: (filterName: string, state: string) => void
}

// Mieux de faire des type spécifiques RadioFilter, InputFilter etc...
export const Filters = observer(({ filters, updateFilter }: FilterProps) => {
  const [focused, setFocused] = useState(0)
  const itemsRef = useRef<any>([])

  useEffect(() => {
    itemsRef.current[focused].focus()
  }, [focused])

  return (
    <div style={{ margin: "10px 20px" }}>
      {Object.values(filters).map((filter, idx) => {
        switch (filter.type) {
          case "input":
          default:
            return (
              <TextInputFilter
                key={filter.label}  
                ref={(el) => (itemsRef.current[idx] = el)}
                filter={filter}
                onUpdateFilter={(label: string, value: string) => {
                  setFocused(idx)
                  updateFilter(label, value)
                }}
              />

              // <Fragment key={filter.label}>
              //   <label htmlFor={filter.label}>{filter.label} : </label>
              //   <input
              //     name={filter.label}
              //     type="text"
              //     value={filter.state}
              //     ref={(el) => (itemsRef.current[idx] = el)}
              //     onChange={(e) => {
              //       setFocused(idx);
              //       updateFilter(filter.label, e.target.value);
              //     }}
              //   />
              // </Fragment>
            )
        }
      })}
    </div>
  )
})
