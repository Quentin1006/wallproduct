import { observer } from "mobx-react-lite"
import { Fragment, useEffect, useMemo, useRef, useState } from "react"
import { useStore } from "../../../state"

import CheckboxGroupFilter from "./CheckboxGroupFilter"
import TextInputFilter from "./TextInputFilter"

// Mieux de faire des type spécifiques RadioFilter, InputFilter etc...
export const Filters = observer(() => {
  const { filters, brandFilterChoices, updateCheckboxFilter, updateFilter } =
    useStore("wallProductStore")
  const [focused, setFocused] = useState(0)
  const itemsRef = useRef<any>([])

  useEffect(() => {
    itemsRef.current[focused].focus()
  }, [focused])

  return (
    <div style={{ margin: "15px 20px" }}>
      <div style={{ fontSize: "24px", paddingBottom: "15px" }}>Filtres :</div>
      <TextInputFilter
        ref={(el) => (itemsRef.current[0] = el)}
        name="search"
        filterState={filters.search}
        onUpdateFilter={(label: string, value: string) => {
          setFocused(0)
          updateFilter(label, { state: value })
        }}
      />
      <hr />
      <CheckboxGroupFilter
        groupName="Marque"
        groupKey="brand"
        choices={brandFilterChoices}
        onUpdateFilter={updateCheckboxFilter}
      />
    </div>
  )
})
