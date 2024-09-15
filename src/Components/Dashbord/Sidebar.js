import "./bars.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu } from "../../Context/MenuContext";
import { useContext, useEffect, useState } from "react";
import { WindowSize } from "../../Context/WindowContext";
import { USER } from "../../API/Api";
import { Axios } from "../../API/axios";
import { links } from "./NaveLink";

export default function SidBar() {
  const menu = useContext(Menu);
  const windowSize = useContext(WindowSize);
  const sizenow = windowSize.Windowsize;

  const isOpen = menu.isOpen;

  //user
  const [user, setUser] = useState("");

  const Navigate = useNavigate();
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => Navigate("/login", { replace: true }));
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "70px",
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0 ,0.2)",
          display: sizenow < "768" && isOpen ? "block" : "none",
        }}
      ></div>
      <div
        className="side-bar pt-3"
        style={{
          left: sizenow < 768 ? (isOpen ? 0 : "100%") : 0,
          width: isOpen ? "240px" : "fit-content",
          position: sizenow < "768" ? "fixed" : "sticky",
        }}
      >
        {links.map(
          (link, key) =>
            link.role.includes(user.role) && (
              <NavLink
                key={key}
                to={link.path}
                className="d-flex align-items-center gap-2 side-bar-link"
              >
                <FontAwesomeIcon
                  style={{
                    padding: isOpen ? "  10px 8px 10px 15px " : "10px 13px",
                  }}
                  icon={link.icon}
                />
                <p
                  className="m-0"
                  style={{
                    display: isOpen ? "block" : "none",
                  }}
                >
                  {link.name}
                </p>
              </NavLink>
            )
        )}
      </div>
    </>
  );
}
