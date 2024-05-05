import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ToastContext from "../context/ToastContext";
import nasaLogo from "../images/NASA_logo.svg.png";


const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  return (
    <header
      className="d-flex justify-content-between align-items-center py-3 px-4"
      style={{
        background: "linear-gradient(to left, black, #1C1678, #8576FF, #7BC9FF)",
      }}
    >
      {user && user.role === "Student" ? (
        <Link
          to="/products"
          className="navbar-brand"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
         <img src={nasaLogo} alt="nasa-logo" style={{ width: "60px", height: "50px" }} />

          <h1 className="m-2 text-white" style={{ paddingLeft: "10px" }}>
            NASA
          </h1>
        </Link>
      ) : (
        <Link
          to="/"
          className="navbar-brand"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h1 className="m-2 text-white " style={{ paddingLeft: "10px" }}>
            NASA
          </h1>
        </Link>
      )}

      {user && (
        <div className="d-flex align-items-center">
          {user.role === "Student" && (
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-secondary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                APOD
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/apod">
                    Picture of the Day
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/apodrandom">
                    Random Images
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/apodrange">
                    Date Range Selection
                  </Link>
                </li>
              </ul>
            </div>
          )}
          {user.role === "Student" && (
            <div className="btn-group mx-2">
              <button
                type="button"
                className="btn btn-secondary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Mars
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/marssol">
                    Photos by Sol
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/marsearthdate">
                    Rover Photos by Earth Date
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/marsmanifestdata">
                    Rover Manifest
                  </Link>
                </li>
              </ul>
            </div>
          )}
          {user.role === "Student" && (
            <button
              className="btn btn-danger"
              onClick={() => {
                setUser(null);
                localStorage.clear();
                toast.success("Logout Successful!");
                navigate("/login", { replace: true });
              }}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
