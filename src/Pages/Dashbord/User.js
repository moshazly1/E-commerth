import axios from "axios";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../API/axios";
import { USER } from "../../API/Api";
import Loading from "../../Components/Loading/Loading";
import { replace, useNavigate, useParams } from "react-router-dom";
export default function User() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [desable, setdesable] = useState(true);
  const [loding, setloding] = useState(false);
  const nav = useNavigate();

  // id

  const { id } = useParams();
  useEffect(() => {
    setloding(true);
    Axios.get(`${USER}/${id}`)
      .then((data) => {
        setName(data.data.name);
        setEmail(data.data.email);
        setRole(data.data.role);
        setloding(false);
      })
      .then(() => setdesable(false))
      .catch(() => nav("/dashboard/users/page/404", { replace: true }));
  }, []);

  //handel submit
  async function Handelsubmit(e) {
    setloding(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/edit/${id}`, {
        name: name,
        email: email,
        role: role,
      });
      window.location.pathname = "/dashboard/users";
    } catch (err) {
      setloding(false);
      console.log(err);
    }
  }

  return (
    <>
      {loding && <Loading />}
      <Form className="bg-white w-100 mx-2 p-3 " onSubmit={Handelsubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="name..."
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlControlInput2"
        >
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="name@example.com"
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlControlInput3"
        >
          <Form.Label>Role</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option disabled value="">
              Select Role
            </option>
            <option value="1995">Admin</option>
            <option value="2001">User</option>
            <option value="1996">Writer</option>
          </Form.Select>
        </Form.Group>
        <button disabled={desable} className="btn btn-primary">
          Save
        </button>
      </Form>
    </>
  );
}
