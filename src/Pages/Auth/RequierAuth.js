import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";

import { USER } from "../../API/Api";
import Loading from "../../Components/Loading/Loading";
import { Axios } from "../../API/axios";
import Err403 from "./403";
export default function ReauerAuth({ allowedRole }) {
  //user
  const [user, setUser] = useState("");

  const Navigate = useNavigate();
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => Navigate("/login", { replace: true }));
  }, []);
  //token and cooke
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  {
  }
  return token ? (
    user === "" ? (
      <Loading />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Err403 role={user.role} />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
