import { Fragment } from "react"

export type CheckboxGroupFilter = {
  groupName: string
  groupKey: string
  onUpdateFilter: (group: string, name: string, isChecked: boolean) => void
  choices: Array<{
    name: string
    checked: boolean
  }>
}

const CheckboxGroupFilter = ({
  choices,
  groupName,
  groupKey,
  onUpdateFilter,
}: CheckboxGroupFilter) => {
  return (
    <>
      <h4>{groupName}</h4>
      {choices.map(({ name, checked }) => (
        <div key={name}>
          <label htmlFor={name}>
            {name}
            <input
              type="checkbox"
              name={name}
              checked={checked}
              onChange={(e) => {
                const isChecked = e.target.checked
                onUpdateFilter(groupKey, name, isChecked)
              }}
            />
          </label>
        </div>
      ))}
    </>
  )
}

export default CheckboxGroupFilter
