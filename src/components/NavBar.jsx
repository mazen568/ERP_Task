import { Link } from "react-router-dom";
import "./NavBar.css"; // Import the scoped CSS

const NavBar = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/" className="nav-item">Task Manger</Link></li>
          <li><Link to="/completed-tasks" className="nav-item">Completed Tasks</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;