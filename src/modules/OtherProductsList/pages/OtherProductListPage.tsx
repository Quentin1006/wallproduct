import { ProductsList } from "@lib/components/ProductsList"
import { useFetcher } from "@shared/fetcher"

import { UserCard } from "../components/UserCard"
import { FETCH_USERS_URL } from "../config"

import type { User } from "typings"
import { Header } from "../components/Header"

const OtherProductsListPage = () => {
  const { isError, data, isLoading } = useFetcher(FETCH_USERS_URL(), {
    disabled: false,
  })

  if (isLoading) {
    return <div>Page is Loading</div>
  }

  if (isError) {
    return <div>Something wrong happened</div>
  }
  return (
    <ProductsList
      totalLength={data.length}
      productType="users"
      getNextProducts={() => false}
      products={data}
      renderProduct={(user: User) => <UserCard user={user} />}
      Header={Header}
    />
  )
}

export default OtherProductsListPage
