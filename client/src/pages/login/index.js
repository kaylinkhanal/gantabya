import { useState } from 'react';
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetails } from '../../redux/reducerSlice/userSlice'
import { useFormik, Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import { useRouter } from "next/router";
import { Button, message } from 'antd';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

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
const Login  = ()=>{
    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
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
          message.success("login successful");
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
  
  
  
  
    return (
        <>
        <div className={styles.main}>
        
  
          <Formik
            initialValues={initialValues}
            validationSchema={SigninSchema}
            onSubmit={handleLogin}
          >
  
            {({ errors, touched }) => (
             
              <Form className={styles.form}>
                <p className={styles.formTitle}>Sign in</p>
                <span className={styles.imageLogo}>
              <img src="https://user-images.githubusercontent.com/110533553/236834215-fa6b3214-ae99-4f98-804e-67c0d4abf9bd.png" className={styles.imageLogo}/>
            </span>
                <label htmlFor="phoneNumber" className={styles.formLabel}>Phone Number</label>
                <Field name="phoneNumber" className={styles.input} />
                {errors.phoneNumber && touched.phoneNumber ? <div className={styles.errorMessage}>{errors.phoneNumber}</div> : null}
  
                <label htmlFor="password" className={styles.formLabel}>Password</label>
                <Field name="password"  type={open == false ? "password" : "text"} placeholder="At least 6 character" className={styles.input} />
                <div className={styles.showpass}>
                {open == false ? (
                  <AiFillEyeInvisible onClick={toggle} />
                ) : (
                  <AiFillEye onClick={toggle} />
                )}
              </div>
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
        </>
      )
}
export default Login