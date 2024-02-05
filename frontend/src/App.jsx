import Registration from "./pages/Registration"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login";
import { BrowserRouter as Router,Routes,  Route, Navigate,  } from 'react-router-dom';
import Home from "./pages/Home";

import Protect from "./pages/Protect";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { useSelector } from "react-redux";
import Testroute from "./pages/Testroute";
import Error from "./pages/Error";
import AddProduct from "./admin/AddProduct";


function App() {


  const isAuthorized = useSelector(state => state.authReducer.isAuthorized);

  
 
  return (
    
    <>
      <Router>
    <Navbar/>
    <ToastContainer
position="bottom-left"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition: Bounce
/>
        <Routes>
          
        <Route path="/" element={<Home/>} />
        <Route path={"/register"} element={isAuthorized?<Navigate to={"/"}/>:<Registration/>} />
        <Route path={"/login"} element={isAuthorized?<Navigate to={"/"}/>:<Login/>} />
        <Route path={"/test"} element={<Testroute/>} />
        <Route path={"/admin/addProduct"} element={<AddProduct/>} />
        <Route path="/protected" element={<PrivateRoute><Protect /></PrivateRoute>} />
        <Route path={"/admin/addProduct"} element={<AddProduct/>} />

            <Route path={"*"} element={<Error/>} />
       
   
        </Routes>
     
    
  
    </Router>
    

        
    </>
  )
}

export default App
