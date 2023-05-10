import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Button, message, Switch } from "antd";

import styles from "./Register.module.css";
import { useDispatch, useSelector } from "react-redux";

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Required"),
  role: Yup.string(),

  licenseNumber: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  vehicleNumber: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  vehicleType: Yup.string().required("Required"),
});

const Register = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isRider, setisRider] = useState(false);
  const [isUser] = useState(false);

  const registerUser = async (values) => {
    values.role = isRider ? "rider" : "user";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    try {
      const res = await fetch("http://localhost:4000/register", requestOptions);
      console.log(res);
      const data = await res.json();
      console.log(data);
      if (res && data.success) {
        messageApi.success(data.msg);
      } else {
        messageApi.error(data.msg);
      }
    } catch (err) {
      messageApi.warning(data.msg);
    }
  };

  const switchRider = (checked) => {
    setisRider(checked);
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{
          fullName: "",
          password: "",
          phoneNumber: "",
          confirmPassword: "",
          role: "",
          licenseNumber: "",
          vehicleNumber: "",
          vehicleType: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          registerUser(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.Home_form}>
            <p className={styles.formTitle}>Signup</p>
            <div className={styles.switch_user}>
            
              <Field
                name="fullName"
                placeholder="Full Name"
                className={styles.Home_input}
              />
              {errors.fullName && touched.fullName ? (
                <div>{errors.fullName}</div>
              ) : null}
              <Field
                name="phoneNumber"
                placeholder="Phone Number"
                className={styles.Home_input}
              />
              {errors.phoneNumber && touched.phoneNumber ? (
                <div>{errors.phoneNumber}</div>
              ) : null}

              <Field
                name="password"
                placeholder="Password"
                className={styles.Home_input}
              />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
              <Field
                name="confirmPassword"
                placeholder="Confirm password"
                className={styles.Home_input}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div>{errors.confirmPassword}</div>
              ) : null}
              <div>
                <Switch
                  defaultChecked={true}
                  style={{ backgroundColor: isRider ? "blue" : "red" }}
                  onChange={switchRider}
                />
                <span>Rider</span>
              </div>
              {isRider ? (
                <div>
                  <Field
                    name="licenseNumber"
                    placeholder="License No"
                    className={styles.Home_input}
                  />
                  {errors.licenseNumber && touched.licenseNumber ? (
                    <div>{errors.licenseNumber}</div>
                  ) : null}
                  <Field
                    name="vehicleNumber"
                    placeholder="Vehicle Number"
                    className={styles.Home_input}
                  />
                  {errors.vehicleNumber && touched.vehicleNumber ? (
                    <div>{errors.vehicleNumber}</div>
                  ) : null}
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
                  {errors.vehicleType && touched.vehicleType ? (
                    <div>{errors.vehicleType}</div>
                  ) : null}
                </div>
              ) :null}
            </div>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
            Already have an account? <Link href="/">Login</Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
