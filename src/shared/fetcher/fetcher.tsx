import { createContext, useContext, useEffect, useRef, useState } from "react"
import axios, { AxiosRequestConfig } from "axios"
import { useAuth } from "../auth"
import { useConfig } from "../../config"

export const FetcherContext = createContext({} as any)

export type UseFetcherOpts = {
  headers?: Record<string, string>
  disabled: boolean
  initialValue?: string
}

export type FetcherOpts = AxiosRequestConfig

export type FetcherProviderProps = {
  apiUrl: string
  getAccessToken: () => string | undefined
  fetcherOpts?: FetcherOpts
  children: React.ReactNode
}

export const useFetcher = (url: string, opts?: UseFetcherOpts) => {
  const { fetcher } = useContext(FetcherContext)
  const [isLoading, setLoading] = useState(true)
  const [isFetching, setFetching] = useState(false)
  const [error, setError] = useState<any>(undefined)
  const [data, setData] = useState<any>(opts?.initialValue)

  const controller = new AbortController()

  const fetchData = useRef(async (url: string) => {
    try {
      setFetching(true)
      const response = await fetcher.get(url, {
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

export const FetcherProvider = ({ apiUrl, children }: FetcherProviderProps) => {
  const {
    auth: { accessToken },
  } = useAuth()
  const axiosInstance = axios.create({
    baseURL: apiUrl,
  })

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
