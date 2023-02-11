import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import axios, { AxiosInstance, AxiosRequestConfig } from "axios"

export const FetcherContext = createContext<FetcherContextProps>({} as FetcherContextProps)

export type FetcherContextProps = {
  fetcher: AxiosInstance
}

export type UseFetcherOpts<T> = {
  headers?: Record<string, string>
  disabled: boolean
  key?: string
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
  const [isFetching, setFetching] = useState<any>(false)
  const [error, setError] = useState<Error | undefined>(undefined)
  const [data, setData] = useState<T | undefined>(opts?.initialValue)

  const controller = useRef<AbortController>(new AbortController())
  const fetchData = useRef(async (url: string) => {
    try {
      setFetching(true)

      console.log("fetcher", "just before fetching -> isFetching", opts?.key, {
        isFetching: JSON.stringify(isFetching),
      })
      const response = await fetcher.get(url, {
        signal: controller.current.signal,
        headers: opts?.headers,
      })
      response?.data && setData(response.data)
    } catch (error: any) {
      console.log(error)
      setError(error)
    }
    setLoading(false)
    setFetching(false)

    console.log("fetcher", "after fetching -> isFetching", opts?.key, {
      isFetching: JSON.stringify(isFetching),
    })
  })

  const refetch = useCallback(
    (url: string) => {
      console.log("fetcher", "in refetch", { isFetching })
      if (isFetching) {
        controller.current.abort()
        controller.current = new AbortController()
      }
      fetchData.current(url)
    },
    [isFetching]
  )

  useEffect(() => {
    console.log("fetcher", "at start of useEffect -> isFetching", opts?.key, {
      isFetching: JSON.stringify(isFetching),
    })

    if (!opts?.disabled) {
      fetchData.current(url)
    }

    return () => {
      console.log("fetcher", "aborting ->isFetching", opts?.key, {
        isFetching: JSON.stringify(isFetching),
      })
      controller.current.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    error,
    isError: Boolean(error),
    isLoading,
    data,
    refetch,
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
      if (error?.response?.status === 401) {
        onUnauthorized?.()
      }
    }
  )

  return (
    <FetcherContext.Provider value={{ fetcher: axiosInstance }}>{children}</FetcherContext.Provider>
  )
}
