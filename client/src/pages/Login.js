import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

import Footer from "../components/Footer";

const Login = () => {
  const { toast } = useContext(ToastContext);
  const { loginUser } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    //spreading the previous state with the new state
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); //prevents the page from reloading/refreshing

    if (!credentials.email || !credentials.password) {
      toast.error("Please enter all the required fields!");
      return;
    }

    loginUser(credentials);
  };

  return (
    // <div className="login-container" style={{ background: "#EEF7FF", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="login-form-container" style={{ background: "#fff", marginLeft:"300px", marginTop:"80px", width:"100vh", padding: "40px", borderRadius: "8px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
        <h3 className="text-center mb-4" style={{ color: "#333", fontWeight: "bold" }}>Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="emailInput" className="form-label mt-4" style={{ color: "#333" }}>
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
              fdprocessedid="8n2of"
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordInput" className="form-label mt-4" style={{ color: "#333" }}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="Enter Password"
              required
              fdprocessedid="8n2of"
            />
          </div>
          <center>
            <button
              type="submit"
              className="btn btn-danger"
              style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px", fontWeight: "bold", borderRadius: "4px", border: "none" }}
            >
              Login
            </button>
          </center>
        </form>
        <p className="text-center mt-3" style={{ color: "#666", fontSize: "14px" }}>
          Don't have an account? <Link to="/register" style={{ color: "#ff6666", fontWeight: "bold" }}>Register</Link>
        </p>
      </div>
    // </div>
  );
};

export default Login;
