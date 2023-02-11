import { makeAutoObservable } from "mobx";

type ModalOpts = {
  isOpen: boolean;
  title: string;
  content: string;
}

type ComparatorOpts = {
  isOpen: boolean;
}

export default class UiStore {
    config: any
    modal: ModalOpts ={ isOpen: false, title: "", content: ""}
    comparator: ComparatorOpts = { isOpen: false}
    title = ""
    selectedMenu = ""
    constructor(config: any) {
      this.config = config
      this.toggleComparator = this.toggleComparator.bind(this)
      this.setModal = this.setModal.bind(this)
      this.setTitle = this.setTitle.bind(this)
      
      makeAutoObservable(this)
    }

    setModal(isOpen: boolean, content: string = "", title: string = "") {
      this.modal = {
        isOpen,
        content,
        title
      }
    }

    toggleComparator() {
      const current = this.comparator.isOpen
      this.comparator = {
        isOpen : !current,
      }
    }

    setTitle(newTitle: string) {
      this.title = newTitle
    }

    setSelectedMenu(newSelectedMenu: string) {
      this.selectedMenu = newSelectedMenu
    }
}