import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiX, FiMenu } from "react-icons/fi";
import "./Navbar.scss";
import newRequest from "../../utils/newRequest";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  // const currentUser = null

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">Easp</span>
          </Link>
          <span className="dot">.</span>
        </div>
        {/* Hamburger */}
        <div className="hamburger" onClick={() => setNavMenuOpen(true)}>
          <FiMenu />
        </div>
        <div className={`links ${navMenuOpen ? "active" : ""}`}>
          <div className="close-menu" onClick={() => setNavMenuOpen(false)}>
            <FiX />
          </div>
          <span>Easp Business</span>
          <span>Explore</span>
          <span>English</span>
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Services
                      </Link>
                      <Link className="link" to="/add">
                        Add New Service
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">
                Sign in
              </Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr className="hr" />
          <div className="menu">
            <Link className="link menuLink" to="/">
              Plumber
            </Link>
            <Link className="link menuLink" to="/">
              Bike & Car Mechanic
            </Link>
            <Link className="link menuLink" to="/">
              Gardener
            </Link>
            <Link className="link menuLink" to="/">
              Electrician
            </Link>
            <Link className="link menuLink" to="/">
              Maid Services
            </Link>
            <Link className="link menuLink" to="/">
              Carpenter
            </Link>

            <Link className="link menuLink" to="/">
              AC Services
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
          </div>
          <hr className="hr" />
        </>
      )}
    </div>
  );
}

export default Navbar;
