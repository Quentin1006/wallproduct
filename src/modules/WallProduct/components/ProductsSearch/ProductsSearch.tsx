import { useCallback, useEffect } from "react"
import { observer } from "mobx-react-lite"

import { useStore } from "@shared/state"
import { useFetcher } from "@shared/fetcher"
import { ProductsList } from "@lib/components/ProductsList"

import Filters from "../Filters"

import { appendFiltersToUrl } from "../../helpers/helpers"
import { FETCH_PRODUCT_URL, OfferType } from "../../config"
import { ProductCard } from "../ProductCard"
import type { Product } from "typings"
import { WelcomeBox } from "../WelcomeBox"
import { ProductsListHeader } from "../ProductsListHeader"

type ProductsSearchProps = {
  type: OfferType
}

const ProductsSearch = observer(({ type }: ProductsSearchProps) => {
  const { addNextProductToDisplay, products, productsToDisplay, filters, setProducts } =
    useStore("wallProductStore")
  const { list } = useStore("comparatorStore")

  const useRenderProduct = useCallback(
    (p: Product) => {
      const isInComparator = list.some((element) => element.name === p.name)
      return <ProductCard product={p} isInComparator={isInComparator} />
    },
    [list]
  )

  const useGetNextProducts = useCallback(() => {
    addNextProductToDisplay()
    return productsToDisplay
  }, [addNextProductToDisplay, productsToDisplay])

  const {
    isError,
    data: productData,
    isLoading,
    refetch,
  } = useFetcher(FETCH_PRODUCT_URL(), {
    disabled: false,
    key: "fetch_product" + String(Math.round(Math.random() * 10000)),
  })

  // Fill up the store with fetched products
  useEffect(() => {
    if (productData) {
      setProducts(productData.products)
    }
  }, [setProducts, productData])

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
        <div
          style={{
            flexGrow: 0,
            width: "30%",
            borderRight: "1px solid grey",
            paddingBottom: "150px",
          }}
        >
          <Filters />
        </div>
        <div style={{ width: "70%" }}>
          <ProductsList
            totalLength={products.length}
            products={productsToDisplay}
            getNextProducts={useGetNextProducts}
            productType="Téléphones"
            renderProduct={useRenderProduct}
            Header={ProductsListHeader}
            headerStyle={{ padding: "15px" }}
          />
        </div>
      </div>
    </div>
  )
})

export default ProductsSearch
