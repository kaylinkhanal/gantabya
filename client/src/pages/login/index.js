import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetails } from '../../redux/reducerSlice/userSlice'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { useRouter } from "next/router";
import { Button, message, Space, Input } from 'antd';
import styles from './Login.module.css';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import Navbar from '@/components/Nav';
const initialValues = {
  phoneNumber: '',
  password: ''
}

const SigninSchema = Yup.object({
  phoneNumber: Yup.number()
    .typeError('must be a number')
    .test('checkLength', 'the number should exactly be 10 digits', val => val.toString().length == 10)
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});
const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch()
  const { token } = useSelector(state => state.user)
  const toggle = () => {
    setOpen(!open);
  };

  const handleLogin = async (values) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber: values.phoneNumber, password: values.password })
    };
    try {
      const res = await fetch('http://localhost:4000/login', requestOptions)
      const data = await res.json()

      if (data.success) {

        dispatch(setUserDetails(data))
      } else {
        message.error("login failed, try again");
      }
    } catch (err) {
      // error tracking tools
      messageApi.warning('Server issues, try again');
    }
  }

  const handleCreateClick = () => {
    router.push('/register')
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (

    <>
      <Navbar />
      <div className={styles.container}>
        <img src="/images/ride.jpg" alt="no image" className={styles.image} />
        <div className={styles.formContainer}>
          <Formik
            initialValues={initialValues}
            validationSchema={SigninSchema}
            onSubmit={handleLogin}
          >

            {({ errors, touched }) => (
              <Form className={styles.form}>
                <div>
                  <strong className={styles.title}>Login</strong>
                </div>
                <hr />
                <div>
                  <div className={styles.input}>
                    <Field
                      as={Input}
                      placeholder="Phone Number"
                      name="phoneNumber"
                      size="large"
                    />
                    <ErrorMessage name="phoneNumber" component="div" className={styles.errorMessage} />
                  </div>


                  <div className={styles.container}>
                    <div className={styles.input}>
                      <Field
                        as={Input.Password}
                        placeholder="Password"
                        name="password"
                        size="large"
                        iconRender={visible =>
                          visible ? (
                            <EyeOutlined onClick={handleTogglePassword} />
                          ) : (
                            <EyeInvisibleOutlined onClick={handleTogglePassword} />
                          )
                        }
                      />
                      <ErrorMessage name="password" component="div" className={styles.errorMessage} />
                    </div>
                  </div>

                  <div className={styles.input}>
                    <Button size='large' htmlType='submit' className={styles.buttonLogin}>Login</Button>
                  </div>
                  <div>
                    <h1 className={styles.subtitle}>Get in the driver’s <br /> seat and get paid</h1>
                    <p>Drive on the platform with the largest network of active riders.</p>
                  </div>
                  <div>
                    <Space wrap>
                      <Button size="large" className={styles.buttonSignup} onClick={handleCreateClick}>Sign up to drive</Button>
                    </Space>
                  </div>
                </div>

              </Form>
            )}
          </Formik>
          {contextHolder}
        </div>
      </div >

      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <h1>The Gantabya you know, reimagined for business</h1>
          <p>A platform for managing global rides and meals, and local deliveries, for companies of any size.</p>
        </div>
      </div>

    </>


  )
}
export default Login