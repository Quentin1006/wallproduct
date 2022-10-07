import { useEffect } from "react"
import { observer } from "mobx-react-lite"

import { useStore } from "../../../state"

import Filters from "../Filters"
import { ProductsList } from "../ProductsList"

import { useFetcher } from "../../../modules/fetcher"
import { appendFiltersToUrl } from "../../helpers/helpers"
import { FETCH_PRODUCT_URL } from "../../config/config"

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
    <div>
      <div style={{ display: "flex" }}>
        <Filters />
        <hr />
        <ProductsList />
      </div>
    </div>
  )
})

export default PublicRenewal
