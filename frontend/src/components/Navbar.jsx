import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthorized } from "../store/authSlice";
import axios from "axios";
import Cookies from "js-cookie";

const Navbar = () => {
  
  const isAuthorized = useSelector(state => state.authReducer.isAuthorized);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = async () => {


    let response;
    try {
      response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/logout`,
         {
          withCredentials: true,
        }
      );
      dispatch(setAuthorized(false));
     Cookies.remove("isAuthorized")
     Cookies.remove("accessToken")
      console.log(response.data);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
   <>
   
   <nav className="bg-gray-800 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <div>
        <Link to="/" className="text-white text-xl font-bold">Your Logo</Link>
      </div>
      <ul className="flex space-x-4">
        {!isAuthorized ? (
          <>
            <li>
              <Link to="/register" className="text-white">Register</Link>
            </li>
            <li>
              <Link to="/login" className="text-white">Login</Link>
            </li>
          </>
        ) : (
          <li>
            <button onClick={handleLogout} className="text-white">Logout</button>
          </li>
        )}
        <li>
          <Link to="/protected" className="text-white">Protected</Link>
        </li>
        <li>
          <Link to="/test" className="text-white">Test Route</Link>
        </li>
        <li>
          <Link to="/admin/addProduct" className="text-white">Add Product</Link>
        </li>
      </ul>
    </div>
  </nav>
   </>
  );
};

export default Navbar;
