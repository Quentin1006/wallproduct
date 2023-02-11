import { useEffect } from "react"
import { useStore } from "@shared/state"

export const useTitle = (title: string) => {
  const { setTitle } = useStore("uiStore")

  useEffect(() => {
    setTitle(title.toUpperCase())
  }, [title, setTitle])
}
