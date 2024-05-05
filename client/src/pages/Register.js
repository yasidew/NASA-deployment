import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const Register = () => {
  const { toast } = useContext(ToastContext);
  const { registerUser } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    //spreading the previous state with the new state
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); //prevents the page from reloading/refreshing

    // console.log(credentials);

    if (
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword ||
      !credentials.role
    ) {
      toast.error("Please enter all the required fields!");
      return;
    }

    //check if the password and confirm password match
    if (credentials.password !== credentials.confirmPassword) {
      toast.error("password do not match");
    }
    const userData = { ...credentials, confirmPassword: undefined };
    registerUser(userData);
  };

  return (
    // <div className="login-container" style={{ background: "#f2f2f2", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="login-form-container" style={{ background: "#fff", padding: "40px",  width:"800px", marginLeft:"250px", borderRadius: "8px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
        <h3 className="text-center mb-4" style={{ color: "#333", fontWeight: "bold" }}>Create your account</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nameInput" className="form-label mt-4" style={{ color: "#333" }}>
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="nameInput"
              name="name"
              value={credentials.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              required
              fdprocessedid="8n2of"
            />
          </div>
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
              placeholder="Your Email"
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
              placeholder="Enter Password"
              onChange={handleInputChange}
              required
              fdprocessedid="8n2of"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label mt-4" style={{ color: "#333" }}>
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={credentials.confirmPassword}
              placeholder="Confirm Password"
              onChange={handleInputChange}
              required
              fdprocessedid="8n2of"
            />
          </div>
          <div className="form-group">
            <label htmlFor="roleInput" className="form-label mt-4" style={{ color: "#333" }}>
              Role
            </label>
            <div className="select-wrapper">
              <select
                className="form-control"
                id="roleInput"
                name="role"
                value={credentials.role}
                onChange={handleInputChange}
                required
                fdprocessedid="8n2of"
              >
                <option value="">Select Role</option>
                <option value="Student">Student</option>
                {/* <option value="Site Manager">Supplier</option>
              <option value="Supplier">Staff</option> */}
              </select>
              <div className="select-arrow">&#9660;</div>
            </div>
          </div>
          <center>
            <button
              type="submit"
              className="btn btn-danger"
              style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px", fontWeight: "bold", borderRadius: "4px", border: "none" }}
            >
              Register
            </button>
          </center>
        </form>
        <p className="text-center mt-3" style={{ color: "#666", fontSize: "14px" }}>
          Already have an account? <Link to="/login" style={{ color: "#ff6666", fontWeight: "bold" }}>Login</Link>
        </p>
      </div>
    // </div>
  );
};

export default Register;
