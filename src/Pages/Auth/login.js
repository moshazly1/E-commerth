import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseURL } from "../../API/Api";
import { LOGIN } from "../../API/Api";
import LoadingSubmit from "../../Components/Loading/Loading";
import "./Auth.css";
import Cookie from "cookie-universal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
export default function Login() {
  //state
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  //Loding
  const [louding, setlouding] = useState(false);
  //focuse
  const focus = useRef(null);

  // error

  const [error, seterror] = useState("");
  //cookie
  const cookie = Cookie();

  //handel
  function handelChange(e) {
    setform({ ...form, [e.target.name]: e.target.value });
  }
  //handel foucs
  useEffect(() => {
    focus.current.focus();
  }, []);
  //handel submet
  async function handelsubmit(e) {
    e.preventDefault();
    setlouding(true);
    try {
      const res = await axios.post(`${baseURL}/${LOGIN}`, form);
      setlouding(false);
      const token = res.data.token;
      const role = res.data.user.role;

      const go = role === "1995" ? "users" : "writer";
      cookie.set("e-commerce", token);

      window.location.pathname = `/dashboard/${go}`;
    } catch (err) {
      setlouding(false);
      if (err.response.status === 401) {
        seterror("Wronng Email Or Password");
      } else {
        seterror("Internal Server ERR");
      }
    }
  }

  return (
    <>
      {louding && <LoadingSubmit />}
      <div className="container">
        {/*  */}
        <div className="row " style={{ height: "100vh" }}>
          <Form className="form" onSubmit={handelsubmit}>
            <div className="custom-form">
              <h1 className="mb-5">Login Now</h1>
              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  value={form.email}
                  onChange={handelChange}
                  type="email"
                  name="email"
                  placeholder="Enter Your email..."
                  required
                  ref={focus}
                />
                <Form.Label>Email:</Form.Label>
              </Form.Group>

              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Control
                  value={form.password}
                  onChange={handelChange}
                  name="password"
                  type="password"
                  placeholder="Enter Your Password..."
                  required
                  minLength="6"
                />
                <Form.Label>Password:</Form.Label>
              </Form.Group>

              <button className="btn btn-primary">Login</button>
              <div className="google-btn">
                <a href={"http://127.0.0.1:8000/login-google"}>
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                      src="https://th.bing.com/th/id/R.a30e50b7234e5020bec2257ade266b6b?rik=eeG1Zc4gymfrdg&pid=ImgRaw&r=0"
                      alt="sign in with google"
                    />
                  </div>
                  <p className="btn-text">
                    <b>Sign in with google</b>
                  </p>
                </a>
              </div>
              {error !== "" && <span className="error">{error}</span>}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
