import { Modal } from "antd";
import { useState } from "react";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { message, Input } from 'antd';
import { useRouter } from 'next/router';
import { CustomButton } from "@/components/customButton";
import { responseHandler } from "@/utils/responseHandler"
import { logout, setToken, setRole } from '@/redux/reducerSlice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
const AccountingSettings = () => {
    const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
    const [showPassword, setShowPassword] = useState(true)
    const dispatch = useDispatch();
    const handleLogout = () => {
      dispatch(logout());
    };
    const { id } = useSelector(state => state.user)
    const usersSchema = Yup.object().shape({

        currentPassword: Yup.string()
            .min(5, "Too Short!")
            .max(100, "Too Long!")
            .required("Required"),

        newPassword: Yup.string()
            .min(5, "Too Short!")
            .max(100, "Too Long!")
            .required("Required"),

        confirmPassword: Yup.string()
            .min(5, "Too Short!")
            .max(100, "Too Long!")
            .required("Required")
            .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),

    });
    return (
        <>
            
                <h3>Change Password</h3>
                <Formik
                    initialValues={{

                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                    }}
                    validationSchema={usersSchema}
                    onSubmit={async (values) => {
                        const { confirmPassword, ...updatedValues } = values
                        const requestOptions = {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(updatedValues),
                        };
                        try {
                            const res = await fetch(`http://localhost:4000/changePassword/${id}`, requestOptions)
                            const data = await res.json()
                            const notify = responseHandler(res, data.errorMsg)
                            // message.success(notify)
                            
                            if (res.status === 200) {
                                message.success(data.msg, [2])
                                
                                // redirect when password changed.
                                dispatch(logout());
                                router.push('/')
                            } else {
                                message.error(data.msg, [2])
                            }
                        } catch (error) {
                            message.error('error');
                        }
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div>
                                <Field
                                    name="currentPassword"
                                    placeholder="Current Password"
                                    type={showPassword ? 'password' : 'text'}
                                />
                                {errors.currentPassword && touched.currentPassword ? (
                                    <div className="validaton-message">{errors.currentPassword}</div>
                                ) : null}
                            </div>
                            <div>
                                <Field
                                    name="newPassword"
                                    placeholder="New Password"
                                    type={showPassword ? 'password' : 'text'}
                                />
                                {errors.newPassword && touched.newPassword ? (
                                    <div className="validaton-message">{errors.newPassword}</div>
                                ) : null}
                            </div>
                            <div>
                                <Field
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    type={showPassword ? 'password' : 'text'}
                                />
                                <div onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Show" : "Hide"}</div>
                                {errors.confirmPassword && touched.confirmPassword ? (
                                    <div className="validaton-message">
                                        {errors.confirmPassword}
                                    </div>
                                ) : null}
                                 {contextHolder}
                            </div>
                            <CustomButton name="Change Password" type="submit" />
                        </Form>
                    )}
                </Formik>
                </>
           
    );
}
export default AccountingSettings;