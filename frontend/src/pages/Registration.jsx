import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import Errormessage from "../components/ErrorMessage";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
  file: Yup.mixed(),
});

const initialValues = {
  username: "",
  email: "",
  password: "",
  avatar: null,
};

const Registration = () => {
  const [loading, setLoading] = useState(false);

  const handleRegistration = async (values) => {
    const formData = new FormData();

    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("avatar", values.avatar);
    console.log(values);

    let response;
    try {
      setLoading(true);
      response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      toast.success(response.data.message);
    } catch (err) {
      if (err.message === "Network Error") {
      toast.error(`${err.message} please try again in few Seconds `);
    } 
    toast.error(err.response.data.message);
    }finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleRegistration}
      >
        {({ handleSubmit, isValid, dirty, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <Field type="text" name="username" />
            <Errormessage name={"username"} />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <Errormessage name={"email"} />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              <Errormessage name={"password"} />
            </div>

            <div>
              <label htmlFor="file">Upload File</label>
              <input
                type="file"
                name="avatar"
                onChange={(event) => {
                  console.log("avatar", event.currentTarget?.files[0])
                  setFieldValue("avatar", event.currentTarget?.files[0]);
                }}
              />
            </div>

            {loading ? (
              <Loading />
            ) : (
              <button type="submit" disabled={!isValid || !dirty}>
                Create Account
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registration;
