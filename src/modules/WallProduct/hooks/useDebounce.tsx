import { useCallback, useEffect, useRef, useState } from "react"

export type UseDebounceProps = {
  initialState: string
  delay: number
  onUpdateDebounce: (name: string, value: string) => void
}

export const useDebounce = ({ initialState, delay, onUpdateDebounce }: UseDebounceProps) => {
  const [debounceValue, setDebounceValue] = useState(initialState)
  const timeoutId = useRef<ReturnType<typeof setTimeout>>()

  const updateDebounce = useCallback((name: string, value: string) => {
    clearTimeout(timeoutId.current)
    setDebounceValue(value)
    timeoutId.current = setTimeout(() => {
      onUpdateDebounce(name, value)
    }, delay)
  }, [])

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId.current)
    }
  }, [])

  return {
    debounceValue,
    updateDebounce,
  }
}
