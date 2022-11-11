import { User } from "typings"

export type UserCardProps = {
  user: User
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "calc(33% - 50px)",
        minWidth: "160px",
        margin: "15px",
        borderRadius: "5%",
      }}
    >
      <div>FirstName: {user.first_name}</div>
      <div>LastName: {user.last_name}</div>
      <div>Email: {user.email}</div>
      <div></div>
    </div>
  )
}
