import { LOGOUT } from "../../API/Api";
import { Axios } from "../../API/axios";

export default function Logout() {
  async function handlelLogout() {
    try {
      const res = await Axios.get(`/${LOGOUT}`);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  return <p>Logout</p>;
}
