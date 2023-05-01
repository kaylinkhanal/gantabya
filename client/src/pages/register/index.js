
import { useState } from 'react'
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import ShowhidePassword from '@/components/showhidePassword';
import Link from 'next/link';
const Register = () =>{
  const handleRegister = async(values)=>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({values})
  };

  const data = await fetch('http://localhost:4000/register',requestOptions)
}
const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

	const SignupSchema = Yup.object().shape({
		fullName: Yup.string().required("Required"),
		phoneNumber: Yup.string().required("Required"),
		password: Yup.string()
			.required("Required")
			.min(6)
			.matches(passwordRule, { message: "Please create a stronger password" }),
		confirmPassword: Yup.string().oneOf(
			[Yup.ref("password"), null],
			"Passwords doesnt match"
		),
	});
  return (
    <>
        <h1>Register</h1>

        <Formik
          initialValues={{
            fullName: "",
            phoneNumber: "",
            role: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            handleRegister(values);
          }}
        >
          {({
            errors,
            touched,
            values,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                name="name"
                placeholder="Your Full Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name ? (
                <div className="error">{errors.name}</div>
              ) : null}

              <Field
                name="phoneNumber"
                placeholder="Your phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.phoneNumber && touched.phoneNumber ? (
                <div className="error">{errors.phoneNumber}</div>
              ) : null}

              <select
                name="userRole"
                value={values.userRole}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option
                  value=""
                  disabled="disabled"
                  label="Select a Role"
                ></option>
                <option value="user" label="User">
                  User
                </option>
                <option value="rider" label="Rider">
                  Rider
                </option>
              </select>
              {errors.userRole && touched.userRole ? (
                <div className="error">{errors.userRole}</div>
              ) : null}

              <Field
                name="password"
                placeholder="Your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                component={ShowhidePassword}
              />
              {errors.password && touched.password ? (
                <div className="error">{errors.password}</div>
              ) : null}

              <Field
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                component={ShowhidePassword}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className="error">{errors.confirmPassword}</div>
              ) : null}

              <button type="submit">Signup</button>
            </Form>
          )}
        </Formik>
        <p style={{ marginTop: "10px" }}>
          Already have an account? Please <Link href={'/'}>Login</Link> to
          continue
        </p>
        </>
);
};

export default Register