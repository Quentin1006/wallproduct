import { useState } from "react"
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
      {isLoading ? (
        <Blurhash
          hash={hash}
          {...rest}
          style={{ display: "flex", justifyContent: "center" }}
          resolutionX={32}
          resolutionY={32}
        />
      ) : (
        ""
      )}
      <img
        style={{ display: isLoading ? "none" : "block" }}
        src={src}
        alt={alt}
        {...rest}
        onLoad={() => {
          setLoading(false)
        }}
      />
    </>
  )
}
