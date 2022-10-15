import { useAuth } from "../../../modules/auth"
import { useFetcher } from "../../../modules/fetcher"
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
        ""
      )}
    </>
  )
}
