import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetails } from '../../redux/reducerSlice/userSlice'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useRouter } from "next/router";
import { Button, message, Space, Input } from 'antd';
import styles from './Login.module.css';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import Navbar from '@/components/Nav';
import Image from 'next/image';
import cover from './images/ride.jpg'
const initialValues = {
  phoneNumber: '',
  password: ''
}

const SigninSchema = Yup.object({
  phoneNumber: Yup.number()
    .typeError('must be a number')
    .test('checkLength', 'the number should exactly be 10 digits', val => val.toString().length == 10)
    .required('required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('required'),
});
const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch()
  const { token } = useSelector(state => state.user)

  const handleLogin = async (values) => {
    try {
      const res = await axios.post('/api/login',{ phoneNumber: values.phoneNumber, password: values.password } )
      if (res.data.data.success) {
        dispatch(setUserDetails(res.data.data))
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
        <div className={styles.imageContainer}>
          <Image src={cover} alt="no image" className={styles.image} />
        </div>
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

                  <div className={styles.input}>
                    <Button size='large' htmlType='submit' className={styles.buttonLogin}>Login</Button>
                  </div>
                  <br />
                  <hr />
                  <br />
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


    </>


  )
}
export default Login