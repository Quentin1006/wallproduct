import { useState } from "react"

export type CheckboxGroupFilter = {
  groupName: string
  groupKey: string
  onUpdateFilter: (group: string, name: string, isChecked: boolean) => void
  choices: Array<{
    name: string
    checked: boolean
  }>
  nbShow?: number
}

const CheckboxGroupFilter = ({
  choices,
  groupName,
  groupKey,
  onUpdateFilter,
  nbShow = choices.length,
}: CheckboxGroupFilter) => {
  const [hideChoices, setHideChoices] = useState(nbShow < choices.length)

  return (
    <>
      <h4>{groupName}</h4>
      {choices.map(({ name, checked }, idx) => {
        const display = hideChoices && idx + 1 > nbShow ? "none" : "flex"
        return (
          <div key={name} style={{ display, justifyContent: "space-between", width: "80%" }}>
            <label
              htmlFor={name}
              style={{ flexGrow: 1, justifyContent: "space-between", display: "flex" }}
            >
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
        )
      })}
      <div style={{ paddingTop: "10px" }}>
        <a
          href=""
          onClick={(e) => {
            e.preventDefault()
            setHideChoices(!hideChoices)
          }}
        >
          {hideChoices ? "Show more +" : "Show less -"}
        </a>
      </div>
    </>
  )
}

export default CheckboxGroupFilter
