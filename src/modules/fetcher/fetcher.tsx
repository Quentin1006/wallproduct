import { createContext, useContext, useEffect, useRef, useState } from "react"
import axios from "axios"
import { useAuth } from "../auth"
import { useConfig } from "../../config"

export const FetcherContext = createContext({} as any)

export type UseFetcherOpts = {
  headers?: Record<string, string>
  disabled: boolean
  initialValue?: string
}
export const isAbsoluteUrl = (testUrl: string) => {
  return testUrl.indexOf("http://") === 0 || testUrl.indexOf("https://") === 0
}

export const useFetcher = (url: string, opts?: UseFetcherOpts) => {
  const { fetcher } = useContext(FetcherContext)
  const { apiUrl } = useConfig()
  const [isLoading, setLoading] = useState(true)
  const [isFetching, setFetching] = useState(false)
  const [error, setError] = useState<any>(undefined)
  const [data, setData] = useState<any>(opts?.initialValue)

  const controller = new AbortController()

  const fetchData = useRef(async (url: string) => {
    try {
      const absoluteUrl = isAbsoluteUrl(url) ? url : `${apiUrl}${url}`
      setFetching(true)
      const response = await fetcher.get(absoluteUrl, {
        signal: controller.signal,
        headers: opts?.headers,
      })
      setData(response.data)
    } catch (error) {
      console.log(error)
      setError(error)
    }
    setLoading(false)
    setFetching(false)
  })

  useEffect(() => {
    if (!opts?.disabled) {
      fetchData.current(url)
    }

    return () => {
      isFetching && controller.abort()
    }
  }, [])

  return {
    error,
    isError: Boolean(error),
    isLoading,
    data,
    refetch: fetchData.current,
  }
}

export const FetcherProvider = ({ children }: any) => {
  const { accessToken } = useAuth()
  const axiosInstance = axios.create()

  useEffect(() => {
    axiosInstance.interceptors.request.use((config) => {
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }

      return config
    })
  }, [axiosInstance, accessToken])
  return (
    <FetcherContext.Provider value={{ fetcher: axiosInstance }}>{children}</FetcherContext.Provider>
  )
}
