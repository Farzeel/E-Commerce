import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import Errormessage from "../components/ErrorMessage";

const AddProduct = () => {
 
    const [loading, setLoading] = useState(false); 
    const [image, setImage] = useState([]); 

    const validationSchema = Yup.object().shape({
        productName: Yup.string().required("productName is required"),
        productDescription: Yup.string().required("productDescription is required"),
        availableQuantity: Yup.number().required("availableQuantity is required"),
        price: Yup.number().required("price is required"),
        category: Yup.string().required("category is required"), 
        productPhotos: Yup.string().required("Photo is required")
      });
      
      const initialValues = {
        productName: "",
        productDescription: "",
        availableQuantity: "",
        category:"",
        price:"",
        productPhotos: "",
      };


      const handleAddProduct = async (values )=>{
        console.log(values)
        const formData = new FormData();
        
        formData.append("price", values.price);
        formData.append("productName", values.productName);
        formData.append("productDescription", values.productDescription);
        formData.append("availableQuantity", values.availableQuantity);
        formData.append("category", values.Category);
        for (let i = 0; i < values.productPhotos.length; i++) {
          formData.append(`productPhotos`, values.productPhotos[i]);
        }
        console.log(values);
    
        let response;
        try {
          setLoading(true);
          response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/admin/addProduct`,
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
          console.log({Errormessage:err.message})
          if (err.message === "Network Error") {
          toast.error(`${err.message} please try again in few Seconds `);
        } 
        toast.error(err.response.data.message);
        }finally {
          setLoading(false);
        }
      }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
    <h2 className="text-2xl font-bold mb-4">Add Product</h2>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleAddProduct}
    >
      {({ handleSubmit, isValid, dirty, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="productName">product Name</label>
            <Field className="mt-1 p-2 w-full border rounded-md" type="text" name="productName" />
          <Errormessage name={"productName"} />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="productDescription">product Description</label>
            <Field className="mt-1 p-2 w-full border rounded-md" type="text" name="productDescription" />
            <Errormessage name={"productDescription"} />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="availableQuantity">available Quantity</label>
            <Field  className="mt-1 p-2 w-full border rounded-md" type="number" name="availableQuantity" placeholder="in Stock e.g 6" />
            <Errormessage name={"availableQuantity"} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="Category">Category</label>
            <Field className="mt-1 p-2 w-full border rounded-md" type="text" name="category"  />
            <Errormessage name={"category"} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="price">Price</label>
            <Field className="mt-1 p-2 w-full border rounded-md" type="number" name="price"  />
            <Errormessage name={"price"} />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="productPhotos">Upload Photo</label>
            <Field
              className="mt-1 p-2 w-full border rounded-md"
              type="file"
              name="productPhotos[]"
              multiple
              onChange={(event) => {
                setFieldValue("productPhotos", event.target.files);
              }}
            />
              <Errormessage name={"productPhotos"} />
             
          </div>
         
         
         
           <div className="mb-4">
           {loading ? (
            <Loading />
          ) : (
            <button 
            className= "bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            type="submit" disabled={!dirty || !isValid}>
             Add Product
            </button>
          )}
           </div>
         
        </Form>
      )}
    </Formik>
    </div>
  </div>
  )
}

export default AddProduct
