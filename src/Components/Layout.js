import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/Create">Create</Link>
          </li>
          <li>
            <Link to="/Expand">Expand</Link>
          </li>
          <li>
            <Link to="/View">View</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
