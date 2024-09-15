import "./App.css";
import HomePage from "./Pages/Website/HomePage";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/login";
import Register from "./Pages/Auth/Register";

import Users from "./Pages/Dashbord/Users";
import GoogelCallBack from "./Pages/Auth/GoogleCallBack";
import Dashbord from "./Pages/Dashbord/Dashboard";
import ReauerAuth from "./Pages/Auth/RequierAuth";
import User from "./Pages/Dashbord/User";
import AddUser from "./Pages/Dashbord/AddUser";

import Writer from "./Pages/Dashbord/Writer";
import Err404 from "./Pages/Auth/404";
import RequireBack from "./Pages/Auth/RequireBack";

import Categores from "./Pages/Dashbord/Categores";
import AddCategory from "./Pages/Dashbord/AddCategory";
import Category from "./Pages/Dashbord/Category";
import Prodacts from "./Pages/Dashbord/Prodacts";
import AddProduct from "./Pages/Dashbord/AddProduct";

export default function App() {
  return (
    <div className="App">
      <Routes>
        {/* pablec Routes */}
        <Route path="/" element={<HomePage />} />

        <Route element={<RequireBack />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/auth/google/callback" element={<GoogelCallBack />} />
        <Route path="/*" element={<Err404 />} />
        {/* Protacted Route */}
        <Route element={<ReauerAuth allowedRole={["1995", "1996", "1999"]} />}>
          <Route path="/dashboard" element={<Dashbord />}>
            <Route element={<ReauerAuth allowedRole={["1995"]} />}>
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<User />} />
              <Route path="user/add" element={<AddUser />} />
            </Route>
            <Route element={<ReauerAuth allowedRole={["1999", "1995"]} />}>
              {/* Categoris */}
              <Route path="categories" element={<Categores />} />
              <Route path="categories/:id" element={<Category />} />
              <Route path="category/add" element={<AddCategory />} />
              {/* Products */}
              <Route path="products" element={<Prodacts />} />
              <Route path="products/:id" element={<Category />} />
              <Route path="product/add" element={<AddProduct />} />
            </Route>
            <Route element={<ReauerAuth allowedRole={["1996", "1995"]} />}>
              <Route path="writer" element={<Writer />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
