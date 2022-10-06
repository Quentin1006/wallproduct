import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import { useStore } from "../state";

const Layout = observer(() => {
  const { title } = useStore("uiStore")
  
  return (
    <>
      <h1>{title}</h1>
      <Outlet />
    </>
  );
});

export default Layout;
