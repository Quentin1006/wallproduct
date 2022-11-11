import { useEffect, useState } from "react"

export const useStickyMenu = (containerRef: any) => {
  const [position, setPosition] = useState<any>("relative")

  useEffect(() => {
    const scrollEvent = () => {
      if (!containerRef) {
        return
      }
      const topBorder = containerRef.current.getBoundingClientRect().top
      if (topBorder < 0) {
        if (position !== "fixed") {
          setPosition("fixed")
        }
      } else {
        if (position !== "relative") {
          setPosition("relative")
        }
      }
    }
    window.addEventListener("scroll", scrollEvent)

    return () => window.removeEventListener("scroll", scrollEvent)
  }, [position, setPosition, containerRef])

  return { position }
}
