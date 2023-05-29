import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Button, message, Switch } from "antd";

import styles from "./Register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";

const Register = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isRider, setisRider] = useState(false);
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const riderSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
      password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
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
  const userSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
      password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Required"),
    role: Yup.string(),
  });
  const toggle = () => {
    setOpen(!open);
  };
  const registerUser = async (values) => {
    values.role = isRider ? "rider" : "user";
    var formData = new FormData();

    const keys = Object.keys(values);
    keys.forEach((item) => {
      formData.append(item, values[item]);
    });
    formData.append("avatar", file);
    const requestOptions = {
      method: "POST",
      body: formData,
    };
    try {
      const res = await fetch("http://localhost:4000/register", requestOptions);
     const data = await res.json()
      console.log(data)
      if (res&&data.success) {
        message.success(data.msg);
      } else {
        message.error(data.msg);
      }
    } catch (err) {
      messageApi.warning(data.msg);
    }
  };

  const switchRider = (checked) => {
    setisRider(checked);
  };

  const handleFileSave = (e) => {
    console.log(e.target.files);
    setFile(e.target.files[0]);
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
        validationSchema={isRider ? riderSchema : userSchema}
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
                <div className={styles.required}>{errors.fullName}</div>
              ) : null}
              <Field
                name="phoneNumber"
                placeholder="Phone Number"
                className={styles.Home_input}
              />
              {errors.phoneNumber && touched.phoneNumber ? (
                <div className={styles.required}>{errors.phoneNumber}</div>
              ) : null}

              <Field
                name="password"
                type={open == false ? "password" : "text"}
                placeholder="Password"
                className={styles.Home_input}
              />
              <div className={styles.showpass_register}>
                {open == false ? (
                  <RxEyeClosed onClick={toggle} />
                ) : (
                  <RxEyeOpen onClick={toggle} />
                )}
              </div>
              {errors.password && touched.password ? (
                <div className={styles.required}>{errors.password}</div>
              ) : null}
              <Field
                name="confirmPassword"
                type={open == false ? "password" : "text"}
                placeholder="Confirm password"
                className={styles.Home_input}
              />
              <div className={styles.showpass_register}>
                {open == false ? (
                  <RxEyeClosed onClick={toggle} />
                ) : (
                  <RxEyeOpen onClick={toggle} />
                )}
              </div>
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className={styles.required}>{errors.confirmPassword}</div>
              ) : null}
              <div>
                <Switch
                  defaultChecked={false}
                  style={{ backgroundColor: isRider ? "blue" : "#795f5f" }}
                  onChange={switchRider}
                />
                <span style={{ color: "black" }}>Rider</span>
              </div>
              {isRider ? (
                <>
                  <Field
                    name="licenseNumber"
                    placeholder="License No"
                    className={styles.Home_input}
                  />
                  {errors.licenseNumber && touched.licenseNumber ? (
                    <div className={styles.required}>
                      {errors.licenseNumber}
                    </div>
                  ) : null}
                  <Field
                    name="vehicleNumber"
                    placeholder="Vehicle Number"
                    className={styles.Home_input}
                  />
                  {errors.vehicleNumber && touched.vehicleNumber ? (
                    <div className={styles.required}>
                      {errors.vehicleNumber}
                    </div>
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
                    <div className={styles.required}>{errors.vehicleType}</div>
                  ) : null}
                </>
              ) : null}
            </div>
            <input type="file" onChange={handleFileSave} />
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
