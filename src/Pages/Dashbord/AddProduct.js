import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../API/axios";
import { CAT, Cat, pro } from "../../API/Api";
import Loading from "../../Components/Loading/Loading";
import { FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function AddProduct() {
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  const dummyForm = {
    category: null,
    title: "dummy",
    description: "dummy",
    price: "222",
    discount: "0",
    About: "About",
  };
  const [image, setIamge] = useState([]);
  const [categories, setCategories] = useState([]);
  const [send, setSend] = useState(false);
  const [loding, setloding] = useState(false);
  const [uploading, setuploading] = useState(0);
  const [id, setid] = useState();
  const openImge = useRef(null);

  const focus = useRef("");
  const progress = useRef([]);
  const nav = useNavigate();
  console.log(progress);

  useEffect(() => {
    focus.current.focus();
  }, []);

  function handelopenImge() {
    openImge.current.click();
  }

  useEffect(() => {
    Axios.get(`/${CAT}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);

  //handel Edite

  async function HandelEdite(e) {
    setloding(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${pro}/edit/${id}`, form);
      nav("/dashboard/products");
    } catch (err) {
      setloding(false);
      console.log(err);
    }
  }
  // handel Submit form
  async function HandelsubmitForm() {
    try {
      const res = await Axios.post(`${pro}/add`, dummyForm);
      setid(res.data.id);
    } catch (err) {
      console.log();
    }
  }

  //  handel Change
  function handelChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSend(true);
    if (send !== 1) {
      HandelsubmitForm();
    }
  }

  //handel Image
  async function HandelImages(e) {
    setIamge((prev) => [...prev, ...e.target.files]);
    const ImgesAsFile = e.target.files;
    const data = new FormData();
    for (let i = 0; i < ImgesAsFile.length; i++) {
      data.append("image", ImgesAsFile[i]);
      data.append("product_id", id);
      try {
        const res = Axios.post("/product-img/add", data, {
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            const percent = Math.floor((loaded * 100) / total);
          },
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  }

  const CatiegoresShow = categories.map((item, key) => (
    <option value={item.id} key={key}>
      {item.title}
    </option>
  ));

  const ImagesShow = image.map((img, key) => (
    <div key={key} className="border p-2 w-100">
      <div className="d-flex align-items-center justify-content-start gap-2 ">
        <img src={URL.createObjectURL(img)} width="80px"></img>
        <div>
          <p className="mb-1">{img.name}</p>
          <p>
            {img.size / 1024 < 900
              ? (img.size / 1024).toFixed(2) + "KB"
              : (img.size / (1024 * 1024)).toFixed(2) + "MB"}
          </p>
        </div>
      </div>
      <div className="custom-progress mt-3">
        <span
          ref={(e) => (progress.current[key] = e)}
          // percent={`${progress[key]}%`}
          // style={{ width: `${progress[key]}%` }}
          className="inner-progress"
        ></span>
      </div>
    </div>
  ));

  return (
    <>
      {loding && <Loading />}
      <Form className="bg-white w-100 mx-2 p-3 " onSubmit={HandelEdite}>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>category</Form.Label>
          <Form.Select
            value={form.category}
            ref={focus}
            name="category"
            onChange={handelChange}
            placeholder="Title..."
          >
            <option disabled>Select Category</option>
            {CatiegoresShow}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={form.title}
            name="title"
            required
            onChange={handelChange}
            type="text"
            placeholder="Title..."
            disabled={!send}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={form.description}
            required
            name="description"
            onChange={handelChange}
            type="text"
            placeholder="Description..."
            disabled={!send}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={form.price}
            required
            name="price"
            onChange={handelChange}
            type="text"
            placeholder="Price..."
            disabled={!send}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="discount">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            value={form.discount}
            required
            name="discount"
            onChange={handelChange}
            type="text"
            placeholder="Discount..."
            disabled={!send}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="About">
          <Form.Label>About</Form.Label>
          <Form.Control
            value={form.About}
            required
            name="About"
            onChange={handelChange}
            type="text"
            placeholder="About..."
            disabled={!send}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="images">
          <Form.Label>Images</Form.Label>
          <Form.Control
            ref={openImge}
            hidden
            multiple
            onChange={HandelImages}
            type="file"
            disabled={!send}
          />
        </Form.Group>
        <div
          onClick={handelopenImge}
          className="d-flex align-items-center justify-content-center gap-2 py-3 rounded mb-2 w-100 flex-column"
          style={{
            border: !send ? "2px dashed gray" : "2px dashed #0086fe",
            cursor: send && "pointer",
          }}
        >
          <img
            src={require("../../Assets/Upload-PNG-HD-Image.png")}
            alt="Upload Hear"
            width="100px"
            style={{ filter: !send && "grayscale(1)" }}
          />
          <p
            className="fw-bold mb-0"
            style={{ color: !send ? "gray" : "#0086fe" }}
          >
            Upload Images
          </p>
        </div>
        <div className="d-flex align-items-start flex-column gap-2">
          {ImagesShow}
        </div>
        <button className="btn btn-primary">Save</button>
      </Form>
    </>
  );
}
