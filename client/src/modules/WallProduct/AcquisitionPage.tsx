import { OfferType } from "./config"
import { useTitle } from "./hooks/useTitle"
import ProductsSearch from "./components/ProductsSearch/ProductsSearch"
import Layout from "./Layout"

const AcquisitionPage = () => {
  useTitle(OfferType.ACQUISITION)
  return (
    <Layout>
      <ProductsSearch type={OfferType.ACQUISITION} />
    </Layout>
  )
}

export default AcquisitionPage
