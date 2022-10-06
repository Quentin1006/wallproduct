import { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { useStore } from "../state"

import Filters from "./components/Filters"
import WallProducts from "./components/WallProducts"
import Renewal from "./Renewal"
import AppModal from "./components/AppModal"
import { useFetcher } from "../modules/fetcher"
import { appendFiltersToUrl } from "./helpers"
import { Comparator } from "./components/Comparator"

const PublicRenewal = observer(({ goBack }: any) => {
  const { products, filters, setProducts, updateFilter } = useStore("renewalStore")
  const { setTitle, title } = useStore("uiStore")
  const { isError, error, data, isLoading, refetch } = useFetcher("/products")

  useEffect(() => {
    setTitle("Public Renewal")
  }, [])

  useEffect(() => {
    if (data) {
      setProducts(data.products)
    }
  }, [data])

  useEffect(() => {
    if (data) {
      const urlWithFilters = appendFiltersToUrl("/products", filters)
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
      <Renewal subtitle="PUBLIC" goBack={goBack} />
      <hr />
      <Filters filters={filters} updateFilter={updateFilter} />
      <hr />
      <WallProducts />
      <Comparator />
      <AppModal />
    </>
  )
})

export default PublicRenewal
