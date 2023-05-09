import React from 'react';
 import { Formik, Form, Field } from 'formik';
 import * as Yup from 'yup';
 import Link from 'next/link'
 import styles from '../../styles/registration.module.css'
 //
 import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Input } from 'antd';
 //

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
    if(res && data.success){
      messageApi.success(data.msg);
    }else{
      messageApi.error(data.msg);
    }
    }catch(err){
      messageApi.warning(data.msg);
    }
  
   }
  
   return (
    <div className={styles.formcontainer}>
    
    
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
          
          
            
          <Form className={styles.Home_form}>
          <h1>Register User</h1>
          <img
             src="https://yt3.googleusercontent.com/ukSizn5ErG26QsBj8CZEXg9ee29vkyMJEiRqLnWQI9E84YysMXec3Y5W3XE8uk5ZceltEhhNWg=s900-c-k-c0x00ffffff-no-rj"
              alt="Logo"
              style={{ width: '100px', height: '80px' }}
                        />
            <Field className={styles.UserInput} prefix={<UserOutlined className="site-form-item-icon" />} name="fullName" placeholder="fullName" />
            {errors.fullName && touched.fullName ? (
              <div className={styles.errormessage}>{errors.fullName}</div>
            ) : null}
            <br/>
            <Field className={styles.UserInput} name="password" placeholder="password" />
            {errors.password && touched.password ? (
              <div className={styles.errormessage}>{errors.password}</div>
            ) : null}
            <br/>

              <Field className={styles.UserInput} name="confirmPassword"  placeholder="confirm password" />
            {errors.confirmPassword && touched.confirmPassword ? (
              <div className={styles.errormessage}>{errors.confirmPassword}</div>
            ) : null}
            <br/>

            <Field className={styles.UserInput} name="phoneNumber" placeholder="phoneNumber"/>
            {errors.phoneNumber && touched.phoneNumber ? <div className={styles.errormessage}>{errors.phoneNumber}</div> : null}
            <br/>
                        <Field className={styles.UserInput} as="select" name="role">
                            <option value="">Choose one</option>
                            <option value="admin">admin</option>
                            <option value="rider">rider</option>
                            <option value="user">user</option>
                        </Field>
                        {errors.role && touched.role ? <div className={styles.errormessage}>{errors.role}</div> : null}


            <button className={styles.Form_button}  type="submit">Submit</button>
            Register if don't have Account <Link href="/" className={styles.Form_button}>Login</Link>
          </Form>
        
        )}
      </Formik>
      {contextHolder}
      
    </div>
  );
 }

 export default Register