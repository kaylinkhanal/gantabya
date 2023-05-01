import React from 'react';
 import { Formik, Form, Field } from 'formik';
 import * as Yup from 'yup';
 import ShowhidePassword from '@/components/showhidePassword';
 const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
    password: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
    phoneNumber:Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
     confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
   role: Yup.string()
    .required('Required')
 });

 const registerUser = async(values)=> {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values)
};
  const res = await fetch('http://localhost:4000/register',requestOptions)
 }

 const Register = () => {
   return (
    <div>
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
            <Field name="password" placeholder="password" component={ShowhidePassword}/>
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <br/>

              <Field name="confirmPassword"  placeholder="confirm password" component={ShowhidePassword}/>
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

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
 }

 export default Register
