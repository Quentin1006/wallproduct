import React, { Fragment, Ref, useState } from "react";
import { Filter } from "../../typings";

export type TextInputFilterProps = {
  filter: Filter 
  onUpdateFilter: (label: string, value: string) => void
}

const TextInputFilter = React.forwardRef(({filter, onUpdateFilter }: TextInputFilterProps, ref: Ref<any>) => {
  return (
    <Fragment key={filter.label}>
      <label htmlFor={filter.label}>{filter.label} : </label>
      <input
          name={filter.label}
          type="text"
          value={filter.state}
          ref={ref}
          onChange={(e) => {
            onUpdateFilter(filter.label, e.target.value)
          }}
      />
    </Fragment>
  )
})

export default TextInputFilter

