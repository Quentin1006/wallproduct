import { useEffect } from "react"
import { useStore } from "../../state"

export const useTitle = (title: string) => {
  const { setTitle } = useStore("uiStore")

  useEffect(() => {
    setTitle(title.toUpperCase())
  }, [])
}
