import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { Button, message, Switch,EyeFilled } from 'antd';
import showHidePassword from '@/components/ShowHidePassword';

import styles from './Register.module.css';
import { useDispatch, useSelector } from 'react-redux'

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be 10 digits')
    .required('Required'),
  confirmPassword: Yup.string().required()
    .oneOf([Yup.ref('password')], 'Passwords must match')
  

});

const Register = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isRider, setisRider] = useState(false);
  const [file, setFile] = useState(null)

  const registerUser = async (values) => {
    values.role = isRider ? 'rider' : 'user'
    var formData = new FormData();

    const keys =Object.keys(values)
    keys.forEach((item)=>{
      formData.append(item,values[item] );
    })
    formData.append('avatar',file );
    const requestOptions = {
      method: 'POST',
      body: formData
    };
    try {
      const res = await fetch('http://localhost:4000/register', requestOptions)
      const data=await res.json()
      if(res && data.success){
        messageApi.success(data.msg)
      }
      else{
        messageApi.warning(data.msg)
      }
   
    } catch (err) {
      // error tracking tools
      console.log(err)
    }
  };

  const switchRider = (checked) => {
    setisRider(checked);

  }


  const handleFileSave =(e)=> {
    console.log(e.target.files)
    setFile(e.target.files[0])
  }

  return (
    <div className={styles.container}>
      <Formik initialValues={{
        fullName: '',
        password: '',
        phoneNumber: '',
        confirmPassword: '',
        role:'',
        licenseNumber: '',
        vehicleNumber: '',
        vehicleType: '',
      }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          registerUser(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.Home_form}>
            <p className={styles.formTitle}>Signup</p>

         
            <div className={styles.switch_user}>
            <Field name="fullName" placeholder="Full Name" className={styles.Home_input}
            />
              {errors.fullName && touched.fullName ? (
                <div className={styles.error}>{errors.fullName}</div>
              ) : null}
                <Field name="phoneNumber" placeholder="Phone Number" className={styles.Home_input} />
              {errors.phoneNumber && touched.phoneNumber ? <div className={styles.error}>{errors.phoneNumber}</div> : null}

              <Field name="password"
               placeholder="Password" 
               component={showHidePassword}
               
                />

              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
              <Field name="confirmPassword" 
              placeholder="Confirm password"
              component={showHidePassword} 
               />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className={styles.error}>{errors.confirmPassword}</div>
              ) : null}
              <div>
                <Switch 
                defaultChecked={false} 
                style={{backgroundColor:isRider? 'blue':'red'}}
                onChange={switchRider} />
                <span>Rider</span>
              </div>
              {isRider &&  (
                <div>
                  <Field name="licenseNumber" placeholder="License No" className={styles.Home_input} />
                  {errors.licenseNumber && touched.licenseNumber ? <div className={styles.error}>{errors.licenseNumber}</div> : null}
                  <Field name="vehicleNumber" placeholder="Vehicle Number" className={styles.Home_input} />
                  {errors.vehicleNumber && touched.vehicleNumber ? <div className={styles.error}>{errors.vehicleNumber}</div> : null}
                  <Field
                    name="vehicleType"
                    className={styles.Home_select}
                    as="select"
                    placeholder="Select vehicle type"
                
                  >
                    <option value="">Vehicle Type</option>
                    <option value="car">Car</option>
                    <option value="motorcycle">Motorcycle</option>
                  </Field>
                  {errors.vehicleType && touched.vehicleType ? <div className={styles.error}>{errors.vehicleType}</div> : null}
                  </div>
              )}
            </div>
            <input type="file" onChange={handleFileSave}/>
            <button type="submit" className={styles.submitButton}>Submit</button>
            Already have an account? <Link href="/">Login</Link>
          </Form>
        )}
      </Formik>
      {contextHolder}
    </div>)
}

export default Register;


