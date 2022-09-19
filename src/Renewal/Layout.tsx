import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <h1>Title</h1>
      <Outlet />
    </>
  );
};

export default Layout;
