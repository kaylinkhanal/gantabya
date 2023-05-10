import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react';
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { setToken } from '../redux/reducerSlice/userSlice'
import { useFormik, Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import { useRouter } from "next/router";
import { Button, message } from 'antd';

const inter = Inter({ subsets: ['latin'] })

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

const Home = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const { token } = useSelector(state => state.user)

  const handleLogin = async (values) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber: values.phoneNumber, password: values.password })
    };
    try {
      const res = await fetch('http://localhost:4000/login', requestOptions)
      const dinesh = await res.json()
      

      if (dinesh.success) {
        message.success("login successful");



        dispatch(setToken(dinesh.token))
      } else {
        message.error("login failed, try again");
      }
    } catch (err) {
      messageApi.warning(data.msg);

    }

  }

  const handleCreateClick = () => {
    router.push('/register')
  };

  const handleLogout = () => {
    dispatch(setToken(''))
  }


  if (token) {
    return (
      <div>
        i am home page
        <button onClick={handleLogout}>Logout</button>
      </div>
    )
  } else {
    return (

      <div className={styles.main}>

        <div className={styles.nav}></div>
        <div>
          <p className={styles.navTitle}>Gantabya</p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={SigninSchema}
          onSubmit={handleLogin}
        >

          {({ errors, touched }) => (
            <Form className={styles.form}>
              <p className={styles.formTitle}>Sign in</p>

              <label htmlFor="phoneNumber" className={styles.formLabel}>Phone Number</label>
              <Field name="phoneNumber" className={styles.input} />
              {errors.phoneNumber && touched.phoneNumber ? <div className={styles.errorMessage}>{errors.phoneNumber}</div> : null}

              <label htmlFor="password" className={styles.formLabel}>Password</label>
              <Field name="password" type="password" placeholder="At least 6 character" className={styles.input} />
              {errors.password && touched.password ? <div className={styles.errorMessage}>{errors.password}</div> : null}

              <button type="submit" className={styles.loginRegisterButton}>
                Continue
              </button>
            </Form>
          )}
        </Formik>
        {contextHolder}


        <div className={styles.createAccountContainer}>
          <div className={styles.dividerContainer}>
            <div className={styles.line}></div>
            <div className={styles.registerHint}>New to Gantabya?</div>
            <div className={styles.line}></div>
          </div>

          <button className={styles.createAccountButton} onClick={handleCreateClick}>Create your Gantabya account</button>

          <div className={styles.fadingLine}>
          </div>
        </div>
      </div>
    )
  }
}
export default Home;