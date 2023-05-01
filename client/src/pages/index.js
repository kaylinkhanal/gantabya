
import { Inter } from 'next/font/google'
import {useState } from 'react';
import Link from 'next/link'
import ShowhidePassword from '@/components/showhidePassword';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  phoneNumber:Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
  password: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
});

const loginUser = async(values)=> {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values)
};
  const res = await fetch('http://localhost:4000/',requestOptions)
 }

 const Login = ()=>{
  return(
    <>
      <h1>Login</h1>
      <Formik
      initialValues={{
        phoneNumber:'',
        password:''
      }}
      validationSchema={LoginSchema}
        onSubmit={values => {
          // same shape as initial values
          loginUser(values)
         
        }}>
           {({ errors, touched }) => (
          <Form>
            <Field name="phoneNumber" placeholder="phoneNumber"/>
            {errors.phoneNumber && touched.phoneNumber ? <div>{errors.phoneNumber}</div> : null}
            <br/>
            <Field name="password" placeholder="password" component={ShowhidePassword}/>
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <br/>
            <button type="submit">Submit</button>
          </Form>
        )}
        </Formik>
    </>
  )
 }
export default Login