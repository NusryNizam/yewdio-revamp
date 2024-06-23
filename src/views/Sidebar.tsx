import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { Heart, Home, Search } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <div className="button-container">
        <NavLink to="/" className="nav-link">
          <Home size={24} color="white" />
          <div className="nav-link-text">Home</div>
        </NavLink>
        <NavLink to="search" className="nav-link">
          <Search size={24} color="white" />
          <div className="nav-link-text">Search</div>
        </NavLink>
        <NavLink to="favourites" className="nav-link">
          <Heart size={24} color="white" />
          <div className="nav-link-text">Favourites</div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
