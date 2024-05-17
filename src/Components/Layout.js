import { Outlet } from "react-router-dom";
import '../index.css';

const Layout = () => {
  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <a className="nav" href="/Create">Create</a>
          </li>
          <li>
            <a className="nav" href="/Expand">Expand</a>
          </li>
          <li>
            <a className="nav" href="/View">View</a>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
