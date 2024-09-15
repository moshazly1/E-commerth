import { useEffect, useState } from "react";
import { USER, USERS } from "../../API/Api";
import { Axios } from "../../API/axios";
import { Link } from "react-router-dom";
import TableShow from "./Table";

export default function Users() {
  const [users, setusers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  // Get crrunt user
  useEffect(() => {
    Axios.get(`${USER}`).then((res) => setCurrentUser(res.data));
  }, []);

  //Get All Users
  useEffect(() => {
    Axios.get(`/${USERS}`)

      .then((data) => setusers(data.data))
      .catch((err) => console.log(err));
  }, []);

  const header = [
    {
      key: "name",
      name: "Username",
    },
    {
      key: "email",
      name: "Email",
    },
    {
      key: "role",
      name: "Role",
    },
  ];

  async function handeldelet(id) {
    try {
      const res = await Axios.delete(`${USER}/${id}`);
      setusers((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between ">
        <h1>Users Page</h1>
        <Link className="btn btn-primary" to="/dashboard/user/add">
          Add User
        </Link>
      </div>
      <TableShow
        header={header}
        data={users}
        currentUser={currentUser}
        delete={handeldelet}
      />
    </div>
  );
}
