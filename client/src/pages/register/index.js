import React from 'react';
 import { Formik, Form, Field } from 'formik';
 import * as Yup from 'yup';
 import Link from 'next/link'
 import styles from './Register.module.css'
 import { Button, message } from 'antd';
 const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
    password: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
    phoneNumber:Yup.number()
    .typeError('must be a number')
    .test('checkLength', 'the number should exactly be 10 digits', val=> val.toString().length ==10 )
     .required('Required'),
     confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    )
    ,
   role: Yup.string()
    .required('Required')
 });


 const Register = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const registerUser = async(values)=> {
 
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
  };

  try{
    const res = await fetch('http://localhost:4000/register',requestOptions)
    const data = await res.json()
    console.log(data)
    // if(res && data.success){
    //   messageApi.success(data.msg);
    // }else{
    //   messageApi.error(data.msg);
    // }
    }catch(err){
      console.log(err)
    }
  
   }
  
   return (
    <div className={styles.Form}>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          fullName: '',
          password: '',
          phoneNumber: '',
          role:''
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          // same shape as initial values
          registerUser(values)
         
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="fullName" placeholder="fullName" />
            {errors.fullName && touched.fullName ? (
              <div>{errors.fullName}</div>
            ) : null}
            <br/>
            <Field name="password" placeholder="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <br/>

              <Field name="confirmPassword"  placeholder="confirm password" />
            {errors.confirmPassword && touched.confirmPassword ? (
              <div>{errors.confirmPassword}</div>
            ) : null}
            <br/>

            <Field name="phoneNumber" placeholder="phoneNumber"/>
            {errors.phoneNumber && touched.phoneNumber ? <div>{errors.phoneNumber}</div> : null}
            <br/>

            <Field name="role" placeholder="role"/>
            {errors.role && touched.role ? <div>{errors.role}</div> : null}
            <br/>

            <button  type="submit">Submit</button>
            Already have an account yet? <Link href="/">Login</Link> instead 
          </Form>
        )}
      </Formik>
      {contextHolder}
    </div>
  );
 }

 export default Register