import { useEffect, useState } from "react"
import { Blurhash } from "react-blurhash"

type OptimizedImageProps = {
  hash: string
  src: string
  alt: string
  [k: string]: unknown
}

export const OptimizedImage = ({ src, hash, alt, ...rest }: OptimizedImageProps) => {
  const [isLoading, setLoading] = useState(true)

  return (
    <>
      {isLoading ? <Blurhash hash={hash} {...rest} /> : ""}
      <img
        src={src}
        alt={alt}
        {...rest}
        onLoad={() => {
          console.log("loaded")
          setLoading(false)
        }}
      />
    </>
  )
}
