import type { FilterRecord } from "../typings";

export const hasFilters = (filters: FilterRecord) => {
  return Object.values(filters).some((f) => f.state !== "");
};

export const appendFiltersToUrl = (url: string, filters: FilterRecord) => {
  const filterValues = Object.values(filters);

  if (!hasFilters(filters)) {
    return url;
  }

  const params = filterValues.reduce((acc, f) => {
    return {
      ...acc,
      [f.label]: f.state,
    };
  }, {} as Record<string, string>);

  return appendQueryParamsToUrl(url, params);
};

export const appendQueryParamsToUrl = (
  url: string,
  params: Record<string, string>
) => {
  const searchKeys = Object.keys(params);
  const searchParams = new URLSearchParams(url);
  searchKeys.forEach((p) => {
    searchParams.append(p, params[p]);
  });

  return `${url}?${searchParams.toString()}`
};
