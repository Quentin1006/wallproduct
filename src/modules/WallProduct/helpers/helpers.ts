import type { FilterRecord } from "typings"

export const hasFilters = (filters: FilterRecord) => {
  return Object.values(filters).some((f) => {
    if (Array.isArray(f.state)) {
      return f.state.length > 0
    }
    return f.state !== ""
  })
}

export const appendFiltersToUrl = (url: string, filters: FilterRecord) => {
  const filterKeys = Object.keys(filters)

  if (!hasFilters(filters)) {
    return url
  }

  const params = filterKeys.reduce((acc, f) => {
    const stateAsArray = filters[f].state as Array<string>
    const stateAsString = filters[f].state as string

    const state = Array.isArray(filters[f].state) ? stateAsArray.join(",") : stateAsString

    if (state.replace(",", "") === "") {
      return acc
    }

    return {
      ...acc,
      [f]: state,
    }
  }, {} as Record<string, string>)

  return appendQueryParamsToUrl(url, params)
}

export const appendQueryParamsToUrl = (url: string, params: Record<string, string>) => {
  const searchKeys = Object.keys(params)
  const searchParams = new URLSearchParams(url)
  searchKeys.forEach((p) => {
    searchParams.append(p, params[p])
  })

  return `${url}?${searchParams.toString()}`
}

export const mapChoicesToState = (
  choices: Array<string> | undefined,
  state: string | Array<string>
) => {
  return (choices || []).map((choice) => ({
    name: choice,
    checked: state.indexOf(choice) >= 0,
  }))
}
