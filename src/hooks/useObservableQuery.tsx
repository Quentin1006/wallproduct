import { useEffect } from "react";
import { useAuth } from "../auth";

export type UseQueryFetcher<T> = (
  headers: Record<string, string>
) => Promise<T>;

export const useObservableQuery = <T,>(fetcher: UseQueryFetcher<T>): any => {
  const { accessToken } = useAuth();

  useEffect(() => {
    fetcher({
      Authorization: `Bearer ${accessToken}`,
    });
  }, [accessToken, fetcher]);
};
