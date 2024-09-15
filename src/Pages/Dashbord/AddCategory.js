import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../API/axios";
import { Cat } from "../../API/Api";
import Loading from "../../Components/Loading/Loading";
import { FormControl } from "react-bootstrap";
export default function AddCategory() {
  const [title, setTitle] = useState("");
  const [image, setImge] = useState("");
  const [loding, setloding] = useState(false);
  const focus = useRef("");
  useEffect(() => {
    focus.current.focus();
  });
  //handel submit
  async function Handelsubmit(e) {
    setloding(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`${Cat}/add`, form);
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
          <Form.Control
            value={title}
            ref={focus}
            required
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <FormControl
            onChange={(e) => setImge(e.target.files.item(0))}
            type="file"
          ></FormControl>
        </Form.Group>
        <button
          disabled={title.length > 1 ? false : true}
          className="btn btn-primary"
        >
          Save
        </button>
      </Form>
    </>
  );
}
