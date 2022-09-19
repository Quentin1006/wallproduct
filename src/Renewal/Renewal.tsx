import { Link } from "react-router-dom";

const Renewal = ({ subtitle, goBack }: any) => {
  return (
    <>
      <div>Work in progress : {subtitle}</div>
      <Link to={goBack}>Go back</Link>
    </>
  );
};

export default Renewal;
