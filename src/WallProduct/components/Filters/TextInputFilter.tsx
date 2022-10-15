import React, { Fragment, Ref, useState } from "react"
import { Filter } from "../../../typings"

export type TextInputFilterProps = {
  filterState: Filter
  name: string
  onUpdateFilter: (label: string, value: string) => void
}

const TextInputFilter = React.forwardRef(
  ({ filterState, name, onUpdateFilter }: TextInputFilterProps, ref: Ref<any>) => {
    return (
      <Fragment key={name}>
        <label htmlFor={name}>{name} : </label>
        <input
          name={name}
          type="text"
          value={filterState.state}
          ref={ref}
          onChange={(e) => {
            onUpdateFilter(name, e.target.value)
          }}
        />
      </Fragment>
    )
  }
)

export default TextInputFilter
