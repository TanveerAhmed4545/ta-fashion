import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import demoUserPic from "../../../assets/images/demoUser.png";
import logo from "../../../assets/images/fa.png";
import { AuthContext } from "../../../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleSignOut = () => {
    logOut()
      .then((result) => {
        console.log(result);
        toast.success("Logout Completed");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error");
      });
  };
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isActive
              ? "bg-none border hover:text-black bg-[#0EB1EA] text-white font-semibold border-[#0EB1EA] mr-3"
              : isPending
              ? "pending"
              : "mr-3  font-semibold"
          }
        >
          Home
        </NavLink>
      </li>
      {!user && (
        <>
          <li>
            <NavLink
              to="/login"
              className={({ isActive, isPending }) =>
                isActive
                  ? "bg-none border hover:text-black bg-[#0EB1EA] text-white font-semibold border-[#0EB1EA] mr-3"
                  : isPending
                  ? "pending"
                  : "mr-3  font-semibold"
              }
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className={({ isActive, isPending }) =>
                isActive
                  ? "bg-none border hover:text-black bg-[#0EB1EA] text-white font-semibold border-[#0EB1EA] mr-3"
                  : isPending
                  ? "pending"
                  : "mr-3  font-semibold"
              }
            >
              Register
            </NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
          <Link to="/" className="flex  items-center">
            <img className="w-auto h-10" src={logo} />
            <span className="font-bold text-sm md:text-xl  ">Ta Fashion</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <div>
            {user && (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <Tooltip id="my-tooltip" />
                    <img
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={user?.displayName}
                      data-tooltip-place="top"
                      src={user?.photoURL ? user.photoURL : demoUserPic}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm z-50 dropdown-content mt-3  p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <button
                      className="btn text-white hover:text-black font-semibold bg-[#0EB1EA]"
                      onClick={handleSignOut}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
