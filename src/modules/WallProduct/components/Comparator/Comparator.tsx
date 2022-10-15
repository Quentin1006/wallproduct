import { useStore } from "@shared/state"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"

export const Comparator = observer(() => {
  const { comparator, toggleComparator } = useStore("uiStore")
  const { removeProduct, list } = useStore("comparatorStore")

  useEffect(() => {
    const shouldOpenOnListChange = list.length > 0 && !comparator.isOpen
    const shouldCloseOnListChange = list.length === 0 && comparator.isOpen
    if (shouldOpenOnListChange || shouldCloseOnListChange) {
      toggleComparator()
    }
  }, [list])
  return (
    <div
      style={{
        position: "fixed",
        bottom: "0",
        height: comparator.isOpen ? "180px" : "25px",
        backgroundColor: "white",
        width: "100%",
        boxShadow: "0px -7px 23px -1px rgba(0,0,0,0.7)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={toggleComparator}>toggle</button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly", paddingTop: "30px" }}>
        {list.map((product) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
            key={`comparator_${product.name}`}
          >
            <div>{product.name}</div>
            <div>
              <img src={product.link} height="50px" />
            </div>
            <button onClick={() => removeProduct(product.name)}>X</button>
          </div>
        ))}
      </div>
    </div>
  )
})
