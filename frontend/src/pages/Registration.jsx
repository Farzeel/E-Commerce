import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios"
import {toast} from 'react-toastify';




const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  file: Yup.mixed(),
});

const initialValues = {
  username: '',
  email: '',
  password: '',
  avatar: null,
};

const handleRegistration = async (values) => {
  const formData = new FormData()
  
  formData.append('username', values.username);
  formData.append('email', values.email);
  formData.append('password', values.password);
  formData.append('avatar', values.avatar);
  console.log(values)

  let response;
  try {
      response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, formData ,
       { 
          headers: 
          {
          'Content-Type': 'multipart/form-data', 
          },
         withCredentials: true,
      })
      console.log('Form submitted:', response.data);
      toast.success(response.data.message)

    
  
  } catch (err) {
    toast.error(err.response.data.message)
      console.log(err.response.data.message)
      
  }

};

const Registration = () => {
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
              <Field
                type="text"
                name="username"
              />
              <ErrorMessage name="username" component="div" />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                name="email"
              />
              <ErrorMessage name="email" component="div" />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
              />
              <ErrorMessage name="password" component="div" />
            </div>

            <div>
              <label htmlFor="file">Upload File</label>
              <input
                type="file"
                name="avatar"
                onChange={(event) => {
                  setFieldValue('avatar', event.currentTarget?.files[0]);
                }}
              />
            </div>

            <button type="submit" disabled={!isValid || !dirty}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registration;
