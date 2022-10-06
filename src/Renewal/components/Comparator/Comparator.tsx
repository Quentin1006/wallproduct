import { useStore } from "../../../state"
import { observer } from "mobx-react-lite"

export const Comparator = observer(() => {
  const { comparator, toggleComparator} = useStore("uiStore")
  

  return (
    <div
      style={{
        position: "fixed",
        bottom: "0",
        height: comparator.isOpen ? "180px" : "25px",
        backgroundColor: "white",
        width: "100%",
        boxShadow: "0px -7px 23px -1px rgba(0,0,0,0.7)"
      }}
    >
      <div style={{display: "flex", justifyContent: "center"}}>
        <button onClick={toggleComparator}>toggle</button>
      </div>
    </div>
  )
})
