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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegistration}
        >
          {({ handleSubmit, isValid, dirty, setFieldValue }) => (
            <Form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
                <Field type="text" name="username" className="mt-1 p-2 w-full border rounded-md" />
                <Errormessage name={"username"} />
              </div>
  
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                <Field type="email" name="email" className="mt-1 p-2 w-full border rounded-md" />
                <Errormessage name={"email"} />
              </div>
  
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                <Field type="password" name="password" className="mt-1 p-2 w-full border rounded-md" />
                <Errormessage name={"password"} />
              </div>
  
              <div>
                <label htmlFor="avatar" className="block text-sm font-medium text-gray-600">Upload File</label>
                <input
                  type="file"
                  name="avatar"
                  onChange={(event) => {
                    setFieldValue("avatar", event.currentTarget?.files[0]);
                  }}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
  
              {loading ? (
                <Loading />
              ) : (
                <button type="submit" disabled={!isValid || !dirty} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                  Create Account
                </button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
  
};

export default Registration;
