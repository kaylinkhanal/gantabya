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
    ),
   role: Yup.string()
    .required('Required'),
    
    address:Yup.string()
    .required("Required")
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
    <div className={styles.Form}>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          fullName: '',
          password: '',
          phoneNumber: '',
          role:'',
          address:'',
          vechicleType:''
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          // same shape as initial values
          registerUser(values)
         
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="fullName" placeholder="FullName" />
            {errors.fullName && touched.fullName ? (
              <div>{errors.fullName}</div>
            ) : null}
            <br/>
            <Field name="password" placeholder="Password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <br/>

              <Field name="confirmPassword"  placeholder="Confirm password" />
            {errors.confirmPassword && touched.confirmPassword ? (
              <div>{errors.confirmPassword}</div>
            ) : null}
            <br/>

            <Field name="phoneNumber" placeholder="PhoneNumber"/>
            {errors.phoneNumber && touched.phoneNumber ? <div>{errors.phoneNumber}</div> : null}
            <br/>
           
            <div id="my-radio-group">Picked</div>
          <div role="group" aria-labelledby="my-radio-group">
            <label>
              <Field type="radio" name="picked" value="One" />
              User
            </label>
            <label>
              <Field type="radio" name="picked" value="Two" />
             Rider
            </label>
            </div>
<br/>
            <Field name="role" placeholder="Role"/>
            {errors.role && touched.role ? <div>{errors.role}</div> : null}
            <br/>
            <Field name="address" placeholder="Address"/>
            {errors.address && touched.address ? <div>{errors.address}</div> : null}
            <br/>
           Select your Vehicle :
           
            {errors.vehicleType && touched.vehicleType? <div>{errors.vehicleType}</div> : null}
           <select name="vehicleType">
              
              <option value="option1">Bike</option>
              <option value="option2"> Car</option>



              </select>

              <br/>
              <br/>
              
              
              
              
              

          



            <button  type="submit">Submit</button>
            <br/>
            Already have an account yet? <Link href="/">Login</Link> instead 
          </Form>
        )}
      </Formik>
      {contextHolder}
    </div>
  );
 }

 export default Register