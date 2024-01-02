import React from "react";
import { Accordion, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import { ReactComponent as UsersIcon } from "../../assets/icons/users.svg";
import { ReactComponent as MedalIcon } from "../../assets/icons/medal.svg";
import { ReactComponent as ContestIcon } from "../../assets/icons/contest.svg";
import { ReactComponent as UserIcon } from "../../assets/icons/user.svg";
import { ReactComponent as SettingIcon } from "../../assets/icons/setting.svg";
import { ReactComponent as CoinIcon } from "../../assets/icons/coin.svg";
import { ReactComponent as FactoryIcon } from "../../assets/icons/factory.svg";

const Sidebar = ({ sidebar, setSidebar }) => {
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <div
        className={`Sidebar position-relative p-3 pe-0 ${sidebar && "active"}`}
      >
        <Button
          onClick={handleSidebar}
          className="border-0 p-0 position-absolute closeBtn d-lg-none"
          variant="transparent"
          style={{ top: "5px", right: "5px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
          >
            <path
              d="M3.64004 2.27L7.50004 6.13L11.34 2.29C11.4249 2.19972 11.527 2.12749 11.6405 2.07766C11.7539 2.02783 11.8762 2.00141 12 2C12.2653 2 12.5196 2.10536 12.7071 2.29289C12.8947 2.48043 13 2.73478 13 3C13.0024 3.1226 12.9796 3.24439 12.9332 3.35788C12.8868 3.47138 12.8176 3.57419 12.73 3.66L8.84004 7.5L12.73 11.39C12.8949 11.5512 12.9915 11.7696 13 12C13 12.2652 12.8947 12.5196 12.7071 12.7071C12.5196 12.8946 12.2653 13 12 13C11.8726 13.0053 11.7454 12.984 11.6267 12.9375C11.5079 12.8911 11.4001 12.8204 11.31 12.73L7.50004 8.87L3.65004 12.72C3.56555 12.8073 3.46461 12.8769 3.35304 12.925C3.24148 12.9731 3.12151 12.9986 3.00004 13C2.73482 13 2.48047 12.8946 2.29293 12.7071C2.1054 12.5196 2.00004 12.2652 2.00004 12C1.99771 11.8774 2.02046 11.7556 2.06689 11.6421C2.11332 11.5286 2.18245 11.4258 2.27004 11.34L6.16004 7.5L2.27004 3.61C2.10523 3.44876 2.00858 3.23041 2.00004 3C2.00004 2.73478 2.1054 2.48043 2.29293 2.29289C2.48047 2.10536 2.73482 2 3.00004 2C3.24004 2.003 3.47004 2.1 3.64004 2.27Z"
              fill="white"
            />
          </svg>
        </Button>
        <div className="top py-2 me-3">
          <Link to="/dashboard">
            <img
              src="/assets/images/mainLogo.png"
              alt="website-logo"
              className="img-fluid bg-white rounded p-1"
            />
          </Link>
        </div>
        <div className="linksWrp">
          <div className="py-2">
            <h6 className="m-0 py-2">MAIN MENU</h6>
            <ul className="list-unstyled ps-0 mb-0 linksUl">
              <li className="py-1">
                <NavLink
                  to="/dashboard"
                  className="d-flex text-white align-items-center gap-10 p-2 rounded-pill"
                >
                  <span className="icn stroke me-2">
                    <HomeIcon />
                  </span>
                  Dashboard
                </NavLink>
              </li>
              <li className="py-1">
                <NavLink
                  to="/manage-users"
                  className="d-flex text-white align-items-center gap-10 p-2 rounded-pill"
                >
                  <span className="icn stroke me-2">
                    <UsersIcon />
                  </span>
                  Manage Users
                </NavLink>
              </li>
              <li className="py-1">
                <NavLink
                  to="/user-contest"
                  // to="/featured-adds-users"
                  className="d-flex text-white align-items-center gap-10 p-2 rounded-pill"
                >
                  <span className="icn me-2">
                    <MedalIcon />
                  </span>
                  Posts
                </NavLink>
              </li>
              <li className="py-1">
                <NavLink
                  to="/vehicles"
                  className="d-flex text-white align-items-center gap-10 p-2 rounded-pill"
                >
                  <span className="icn me-2">
                    <FactoryIcon />
                  </span>
                  Vehicles
                </NavLink>
              </li>
              <li className="py-1">
                <NavLink
                  to="/make"
                  className="d-flex text-white align-items-center gap-10 p-2 rounded-pill"
                >
                  <span className="icn stroke me-2">
                    <CoinIcon />
                  </span>
                  Make & Model
                </NavLink>
              </li>
              <li className="py-1">
                <NavLink
                  to="/country"
                  className="d-flex text-white align-items-center gap-10 p-2 rounded-pill"
                >
                  <span className="icn stroke me-2">
                    <CoinIcon />
                  </span>
                  Country & City
                </NavLink>
              </li>
              <li className="py-1">
                <NavLink
                  to="/contentPage"
                  className="d-flex text-white align-items-center gap-10 p-2 rounded-pill"
                >
                  <span className="icn stroke me-2">
                    <CoinIcon />
                  </span>
                  Content Pages
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
