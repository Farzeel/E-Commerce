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
    <div style={{width:"100vw" , backgroundColor:"gray" , height:"30px"}}>

      <ul style={{display:"flex", gap:"20px"}}>
        
        {!isAuthorized ? 
        <>
        <li>
        <Link to="/register">register</Link>
      </li>
        <li>
          <Link to="/login">login</Link>
        </li>
        </>
        :
       <button onClick={handleLogout}>Logout</button>}
          <li>
          <Link to="/protected">protected</Link>
        </li>
          <li>
          <Link to="/test">TestRoute</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
