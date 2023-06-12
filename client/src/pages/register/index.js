import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Button, message, Switch } from "antd";

import styles from "./Register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import Navbar from "@/components/Nav";

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
      if (res && data.success) {
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
    <>
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
            <Form>
              
           </Form>
          )}
        </Formik>
      </div>
    </>

  );

};


export default Register;
