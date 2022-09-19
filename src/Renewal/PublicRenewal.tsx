import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../state";

import Filters from "./components/Filters";
import WallProducts from "./components/WallProducts";
import Renewal from "./Renewal";

const PublicRenewal = observer(({ goBack }: any) => {
  const { products, fetchProducts, filters, isLoading, isError, updateFilter } =
    useStore("renewalStore");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, filters]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Une erreur s'est produite...</div>;
  }
  return (
    <>
      <Renewal subtitle="PUBLIC" goBack={goBack} />
      <hr />
      <Filters filters={filters} updateFilter={updateFilter} />
      <hr />
      <WallProducts products={products} />
    </>
  );
});

export default PublicRenewal;
