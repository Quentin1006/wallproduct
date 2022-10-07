import { useEffect } from "react"
import { observer } from "mobx-react-lite"

import { useStore } from "../state"

import Filters from "./components/Filters"
import { ProductsList } from "./components/ProductsList"

import { useFetcher } from "../modules/fetcher"
import { appendFiltersToUrl } from "./helpers"
import { FETCH_PRODUCT_URL } from "./config"

const PublicRenewal = observer(({ goBack }: any) => {
  const { products, filters, setProducts, updateFilter } = useStore("wallProductStore")
  const { isError, error, data, isLoading, refetch } = useFetcher(FETCH_PRODUCT_URL, {
    disabled: false,
  })

  useEffect(() => {
    if (data) {
      setProducts(data.products)
    }
  }, [data])

  useEffect(() => {
    if (data) {
      const urlWithFilters = appendFiltersToUrl(FETCH_PRODUCT_URL, filters)
      console.log({ urlWithFilters })
      refetch(urlWithFilters)
    }
  }, [filters])

  if (isError) {
    return <div>Une erreur s'est produite...</div>
  }

  if (isLoading || !products) {
    return <div>Loading...</div>
  }

  return (
    <>
      <hr />
      <Filters filters={filters} updateFilter={updateFilter} />
      <hr />
      <ProductsList />
    </>
  )
})

export default PublicRenewal
