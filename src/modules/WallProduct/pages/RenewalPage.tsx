import { useTitle } from "../hooks/useTitle"
import ProductsSearch from "../components/ProductsSearch/ProductsSearch"
import { OfferType } from "../config/config"

const RenewalPage = () => {
  useTitle(OfferType.RENEWAL)
  return <ProductsSearch type={OfferType.RENEWAL} />
}

export default RenewalPage
