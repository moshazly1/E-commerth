import axios from "axios";
import { useEffect } from "react";
import { baseURL, GOOGLECALLBACK } from "../../API/Api";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";

export default function GoogelCallBack() {
  const cookie = Cookie();
  const location = useLocation();
  useEffect(() => {
    async function GoogleCall() {
      try {
        const res = await axios.get(
          `${baseURL}/${GOOGLECALLBACK}${location.search}`
        );
        const token = res.data.access_token;
        cookie.set("e-commerce", token);
      } catch (err) {
        console.log(err);
      }
    }
    GoogleCall();
  }, []);

  return <h1>Test</h1>;
}
