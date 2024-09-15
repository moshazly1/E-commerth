import { Link } from "react-router-dom";
import { pro, PRO } from "../../API/Api";
import { useEffect, useState } from "react";
import { Axios } from "../../API/axios";
import TableShow from "./Table";

export default function Prodacts() {
  const [prodacts, setprodacts] = useState([]);

  //Get All Catiegores
  useEffect(() => {
    Axios.get(`/${PRO}`)
      .then((data) => setprodacts(data.data))
      .catch((err) => console.log(err));
  }, []);

  const header = [
    {
      key: "title",
      name: "Title",
    },
    {
      key: "description",
      name: "Description",
    },
    {
      key: "price",
      name: "Price",
    },
    {
      key: "rating",
      name: "Rating",
    },
  ];

  async function handeldelet(id) {
    try {
      const res = await Axios.delete(`${pro}/${id}`);
      setprodacts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between ">
        <h1>Products Page </h1>
        <Link className="btn btn-primary" to="/dashboard/category/add">
          Add Product
        </Link>
      </div>

      <TableShow header={header} data={prodacts} delete={handeldelet} />
    </div>
  );
}
