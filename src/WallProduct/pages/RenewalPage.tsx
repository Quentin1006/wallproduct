import { useTitle } from "../hooks/useTitle"
import ProductsSearch from "../components/ProductsSearch/ProductsSearch"
import { OfferType } from "../config/config"

const RenewalPage = () => {
  useTitle("Renouvellement")
  return <ProductsSearch type={OfferType.RENEWAL} />
}

export default RenewalPage
