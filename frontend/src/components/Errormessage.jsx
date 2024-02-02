import React from 'react'
import { ErrorMessage } from "formik";
const Errormessage = ({name}) => {
  return (
    <div style={{color:"red" , fontSize:"12px"}}>
     <ErrorMessage name={name}/>
    </div>
  )
}

export default Errormessage
