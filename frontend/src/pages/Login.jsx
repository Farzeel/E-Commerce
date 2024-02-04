import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setAuthorized } from "../store/authSlice";

import Loading from "../components/Loading";
import Errormessage from "../components/ErrorMessage";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();



  const handleLogin = async (values) => {
    setLoading(true);
    const data = {
      email: values.email,
      password: values.password,
    };
    console.log(data);
    let response;
    try {
      response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        data,
        {
          withCredentials: true,
        }
      );
      dispatch(setAuthorized(true));
      toast.success(response.data.message);
    } 
    catch (err) {
      if (err.message === "Network Error") {
        toast.error(`${err.message} please try again in few Seconds `);
      }
      console.log(err);
      toast.error(err.response.data.message);
 
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ handleSubmit, isValid, dirty }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <Errormessage name="email"/>
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              <Errormessage name="password"/>
            </div>

            {loading ? (
              <Loading />
            ) : (
              <button type="submit" disabled={!isValid || !dirty}>
                Login
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;