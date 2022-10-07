import { useTitle } from "./hooks/useTitle"
import ProductsSearch from "./ProductsSearch"
import { OfferType } from "./config"

const RenewalPage = () => {
  useTitle("Renouvellement")
  return <ProductsSearch type={OfferType.RENEWAL} />
}

export default RenewalPage
