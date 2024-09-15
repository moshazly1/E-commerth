import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseURL } from "../../API/Api";
import { REGISTER } from "../../API/Api";
import LoadingSubmit from "../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import Form from "react-bootstrap/Form";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
export default function Register() {
  //state
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [louding, setlouding] = useState(false);
  const [error, seterror] = useState("");
  //fucse
  const foucs = useRef("");

  //cookie
  const cookie = Cookie();
  //handel
  function handelChange(e) {
    setform({ ...form, [e.target.name]: e.target.value });
  }
  // handel fucse

  useEffect(() => {
    foucs.current.focus();
  }, []);

  //handel submet
  async function handelsubmit(e) {
    e.preventDefault();
    setlouding(true);
    try {
      const res = await axios.post(`${baseURL}/${REGISTER}`, form);
      setlouding(false);
      const token = res.data.token;
      cookie.set("e-commerce", token);
      // navigate("/dashboard/users", { replace: true });
      window.location.pathname = "/dashboard/users";
    } catch (err) {
      console.log(err);

      setlouding(false);
      if (err.response.status === 422) {
        seterror("Email is already been taken");
      } else {
        seterror("Internal Server ERR");
      }
    }
  }

  return (
    <>
      {louding && <LoadingSubmit />}
      <div className="container">
        <div className="row " style={{ height: "100vh" }}>
          <form className="form" onSubmit={handelsubmit}>
            <div className="custom-form">
              <h1 className="mb-3">Register Now</h1>
              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  value={form.name}
                  ref={foucs}
                  onChange={handelChange}
                  type="text"
                  name="name"
                  placeholder="Enter Your Name..."
                  required
                />
                <Form.Label>Name:</Form.Label>
              </Form.Group>
              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Control
                  value={form.email}
                  onChange={handelChange}
                  type="email"
                  name="email"
                  placeholder="Enter Your email..."
                  required
                />
                <Form.Label>Email:</Form.Label>
              </Form.Group>

              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput3"
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

              <button className="btn btn-primary">Register</button>
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
                    <b>Rigister with google</b>
                  </p>
                </a>
              </div>
              {error !== "" && <span className="error">{error}</span>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
