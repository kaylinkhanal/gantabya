import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetails } from '../../redux/reducerSlice/userSlice'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { useRouter } from "next/router";
import { Button, message, Space, Input, Tabs } from 'antd';
import styles from './Login.module.css';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import Navbar from '@/components/Nav';
import Image from 'next/image';
import cover from './images/ride.jpg';
import Register from '../register';

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

  const dispatch = useDispatch()
  const { token } = useSelector(state => state.user)

  const onChange = (key) => {
    console.log(key);
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



  const items = [
    {
      key: '1',
      tab: `Login`,
      content: (
        <>
          <Formik
            initialValues={initialValues}
            validationSchema={SigninSchema}
            onSubmit={handleLogin}
          >
            {({ errors, touched }) => (
              <Form className={styles.form}>
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
              </Form>
            )}
          </Formik>
        </>
      ),
    },
    {
      key: '2',
      tab: `Register`,
      content: (
        <>
          <Register />
        </>
      ),
    }
  ];

  return (
    <>
      <Navbar />
      <div className={styles.container}>

        <div className={styles.formContainer}>
          <Tabs defaultActiveKey="1" onChange={onChange}>
            {items.map(item => (
              <Tabs.TabPane tab={item.tab} key={item.key}>
                {item.content}
              </Tabs.TabPane>
            ))}
          </Tabs>
          {contextHolder}
        </div>
      </div>
    </>
  )
}

export default Login;
