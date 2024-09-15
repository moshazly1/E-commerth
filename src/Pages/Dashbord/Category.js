import axios from "axios";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../API/axios";
import { Cat, USER } from "../../API/Api";
import Loading from "../../Components/Loading/Loading";
import { replace, useNavigate, useParams } from "react-router-dom";
import { FormControl } from "react-bootstrap";
export default function Category() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const [desable, setdesable] = useState(true);
  const [loding, setloding] = useState(false);
  const nav = useNavigate();

  // id

  //   const idp = useParams();
  //   const id = idp.id;
  const { id } = useParams();

  useEffect(() => {
    setloding(true);
    Axios.get(`${Cat}/${id}`)
      .then((data) => {
        setTitle(data.data.title);
        setloding(false);
      })
      .then(() => setdesable(false))
      .catch(() => nav("/dashboard/categories/page/404", { replace: true }));
  }, []);

  //handel submit
  async function Handelsubmit(e) {
    setloding(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`${Cat}/edit/${id}`, form);
      window.location.pathname = "/dashboard/categories";
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
          <Form.Label>Title</Form.Label>
          <FormControl
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="titel..."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <FormControl
            onChange={(e) => setImage(e.target.files.item(0))}
            type="file"
          ></FormControl>
        </Form.Group>

        <button disabled={desable} className="btn btn-primary">
          Save
        </button>
      </Form>
    </>
  );
}
