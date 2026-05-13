import { Link } from "react-router";
function Navbar() {
  return (
    <nav>
      {/*Logo Boi*/}
      <div className="navbar bg-base-content px-4 lg:px-8 shadow-sm">
        <div className="navbar-start">
          <Link
            to="/home"
            className="text-xl text-white font-bold tracking-widest"
          >
            AROCKET
          </Link>
        </div>

        {/*HomePage*/}
        <div className="navbar-end hidden text-white lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <Link to="/home">Home</Link>
            </li>

            {/*ExplorePage*/}
            <li className="dropdown dropdown-hover">
              <button
                popoverTarget="popover-1"
                style={{ anchorName: "--anchor-1" }}
              >
                Explore
              </button>
              <ul
                ul
                className="dropdown menu w-52 shadow-sm bg-base-content"
                popover="auto"
                id="popover-1"
                style={{ positionAnchor: "--anchor-1" }}
              >
                <li>
                  <Link to="/apod">Picture of the Day</Link>
                </li>
                <li>
                  <Link to="/imagevideo">Library</Link>
                </li>
                <li>
                  <Link to="/planets">Planets</Link>
                </li>
              </ul>
            </li>

            {/*LearningPage*/}
            <li>
              <Link to="/personal">Learnings</Link>
            </li>

            {/*AboutPage*/}
            <li>
              <Link to="/about">About</Link>
            </li>

            {/*Redirect ProfilePage*/}
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
