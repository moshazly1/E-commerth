import { Link } from "react-router-dom";
import { Cat, CAT } from "../../API/Api";
import { useEffect, useState } from "react";
import { Axios } from "../../API/axios";
import TableShow from "./Table";

export default function Categores() {
  const [categories, setCategories] = useState([]);

  //Get All Catiegores
  useEffect(() => {
    Axios.get(`/${CAT}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);

  const header = [
    {
      key: "title",
      name: "Title",
    },
    {
      key: "image",
      name: "Image",
    },
  ];

  async function handeldelet(id) {
    try {
      const res = await Axios.delete(`${Cat}/${id}`);
      setCategories((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between ">
        <h1>Categories Page </h1>
        <Link className="btn btn-primary" to="/dashboard/category/add">
          Add Category
        </Link>
      </div>

      <TableShow header={header} data={categories} delete={handeldelet} />
    </div>
  );
}
