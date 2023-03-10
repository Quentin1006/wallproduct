import { observer } from "mobx-react-lite"
import { useCallback, useState } from "react"
import { useStore } from "@shared/state"

import CheckboxGroupFilter from "./CheckboxGroupFilter"
import TextInputFilter from "./TextInputFilter"

// Mieux de faire des type spécifiques RadioFilter, InputFilter etc...
export const Filters = observer(() => {
  const { filters, brandFilterChoices, colorFilterChoices, updateCheckboxFilter, updateFilter } =
    useStore("wallProductStore")
  const [, setFocused] = useState(0)

  const useUpdateFilter = useCallback(
    (label: string, value: string) => {
      setFocused(0)
      updateFilter(label, { state: value })
    },
    [updateFilter]
  )

  return (
    <div style={{ margin: "15px 20px" }}>
      <div style={{ fontSize: "24px", paddingBottom: "15px" }}>Filtres</div>
      <TextInputFilter
        name="search"
        filterState={filters.search}
        onUpdateFilter={useUpdateFilter}
      />
      <hr />
      <CheckboxGroupFilter
        groupName="Marque"
        groupKey="brand"
        choices={brandFilterChoices}
        onUpdateFilter={updateCheckboxFilter}
        nbShow={4}
      />
      <hr />

      <CheckboxGroupFilter
        groupName="Couleur"
        groupKey="color"
        choices={colorFilterChoices}
        onUpdateFilter={updateCheckboxFilter}
        nbShow={2}
      />
    </div>
  )
})
