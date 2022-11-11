import { createContext, useContext, useEffect, useRef, useState } from "react"
import axios, { AxiosInstance, AxiosRequestConfig } from "axios"

export const FetcherContext = createContext<FetcherContextProps>({} as FetcherContextProps)

export type FetcherContextProps = {
  fetcher: AxiosInstance
}

export type UseFetcherOpts<T> = {
  headers?: Record<string, string>
  disabled: boolean
  initialValue?: T
}

export type FetcherOpts = AxiosRequestConfig

export type FetcherProviderProps = {
  apiUrl: string
  onUnauthorized?: () => Promise<void>
  getAccessToken: () => string | undefined
  fetcherOpts?: FetcherOpts
  children: React.ReactNode
}

export function useFetcher<T = any>(url: string, opts?: UseFetcherOpts<T>) {
  const { fetcher } = useContext(FetcherContext)
  const [isLoading, setLoading] = useState(true)
  const [isFetching, setFetching] = useState(false)
  const [error, setError] = useState<Error | undefined>(undefined)
  const [data, setData] = useState<T | undefined>(opts?.initialValue)

  const controller = useRef<AbortController>(new AbortController())
  const fetchData = useRef(async (url: string) => {
    try {
      setFetching(true)
      const response = await fetcher.get(url, {
        signal: controller.current.signal,
        headers: opts?.headers,
      })
      setData(response.data)
    } catch (error: any) {
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

    const currentController = controller.current
    return () => {
      isFetching && currentController.abort()
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

export const FetcherProvider = ({
  apiUrl,
  getAccessToken,
  onUnauthorized,
  children,
}: FetcherProviderProps) => {
  const axiosInstance = axios.create({
    baseURL: apiUrl,
  })

  axiosInstance.interceptors.request.use((config) => {
    if (getAccessToken() && config.headers) {
      config.headers.Authorization = `Bearer ${getAccessToken()}`
    }

    return config
  })

  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401) {
        onUnauthorized?.()
      }
    }
  )

  return (
    <FetcherContext.Provider value={{ fetcher: axiosInstance }}>{children}</FetcherContext.Provider>
  )
}
