import Modal from "react-modal"

import { useStore } from "../../state"
import { observer } from "mobx-react-lite"

const AppModal = observer(() => {
  const uiStore = useStore("uiStore")
  const { isOpen, content, title } = uiStore.modal || {}

  const closeModal = () => {
    uiStore.setModal(false)
  }
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <div style={{ display: "flex", justifyContent: "space-between"}}>
        <h4>{title}</h4>
        <button onClick={closeModal}>X</button>
      </div>
      
      <p>{content}</p>
    </Modal>
  )
})

export default AppModal
