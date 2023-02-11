import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

import { useAuth } from "@shared/auth"
import { useFetcher } from "@shared/fetcher"
import { FETCH_USER_URL } from "../../config"

export const WelcomeBox = () => {
  const { auth } = useAuth()
  const { data: userData } = useFetcher(FETCH_USER_URL(auth.id), {
    disabled: !auth?.id,
  })

  return (
    <>
      {userData ? (
        <div style={{ fontSize: "24px", marginBottom: "20px" }}>
          Bonjour {userData.name} {userData.lastname}
        </div>
      ) : (
        <Skeleton style={{ height: "24px", width: "250px" }} count={1} />
      )}
    </>
  )
}
