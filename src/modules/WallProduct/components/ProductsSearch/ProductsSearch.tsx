import { useCallback, useEffect } from "react"
import { observer } from "mobx-react-lite"

import { useStore } from "@shared/state"

import Filters from "../Filters"
import { ProductsList } from "../ProductsList"

import { useFetcher } from "@shared/fetcher"
import { appendFiltersToUrl } from "../../helpers/helpers"
import { FETCH_PRODUCT_URL, OfferType } from "../../config"
import { ProductCard } from "../ProductCard"
import { Product } from "typings"
import { WelcomeBox } from "../WelcomeBox"

type ProductsSearchProps = {
  type: OfferType
}

const ProductsSearch = observer(({ type }: ProductsSearchProps) => {
  const { products, filters, setProducts } = useStore("wallProductStore")
  const useRenderProduct = useCallback((p: Product) => <ProductCard product={p} />, [])

  const {
    isError,
    data: productData,
    isLoading,
    refetch,
  } = useFetcher(FETCH_PRODUCT_URL(), {
    disabled: false,
  })

  // Fill up the store with fetched products
  useEffect(() => {
    if (productData) {
      setProducts(productData.products)
    }
  }, [productData])

  // Refetch products when filters change
  useEffect(() => {
    if (productData) {
      const urlWithFilters = appendFiltersToUrl(FETCH_PRODUCT_URL(), filters)
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
      <WelcomeBox />
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: 0 }}>
          <Filters />
        </div>
        <hr />

        <ProductsList
          products={products}
          productType="Téléphones"
          renderProduct={useRenderProduct}
        />
      </div>
    </div>
  )
})

export default ProductsSearch
