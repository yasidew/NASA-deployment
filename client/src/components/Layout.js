// import Navbar from "./Navbar";

// this is a layout component which will be used in every part of our website
const Layout = ({ navbar = true, children }) => {
  return (
    <>

      {/* this is will extra space for every part of our website */}
      <div className="container mt-3">{children}</div>
    </>
  );
};

export default Layout;