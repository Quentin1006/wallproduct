import { OfferType } from "./config"
import { useTitle } from "./hooks/useTitle"
import ProductsSearch from "./ProductsSearch"

const AcquisitionPage = () => {
  useTitle(OfferType.ACQUISITION)
  return <ProductsSearch type={OfferType.ACQUISITION} />
}

export default AcquisitionPage
