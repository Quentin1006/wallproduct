import { useTitle } from "../hooks/useTitle"
import ProductsSearch from "../components/ProductsSearch/ProductsSearch"
import { OfferType } from "../config/config"
import Layout from "../Layout"

const RenewalPage = () => {
  useTitle(OfferType.RENEWAL)
  return (
    <Layout>
      <ProductsSearch type={OfferType.RENEWAL} />
    </Layout>
  )
}

export default RenewalPage
