import moment from "moment"
import lodash from "lodash"

export const Header = () => {
  const nowMoment = moment()
  const today = lodash.deburr(nowMoment.format("DD/MM/YYYY"))

  return (
    <div style={{ padding: "20px", backgroundColor: "#7878b3", width: "100%" }}>
      <div>Today : {today}</div>
      <div>I am the Header for the user list</div>
    </div>
  )
}
