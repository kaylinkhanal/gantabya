import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phoneNumber: Yup.string()
    .min(10, "Too Short")
    .max(15, "Too Long")
    .required("Required"),
  password: Yup.string()
    .min(8, "too short")
    .max(20, "too Long")
    .required("Required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  role: Yup.string().required("Required"),
});

const Register = () => {
  return (
    <>
      <div className="container">
        <div>
          <h1>Register</h1>
          <Formik
            initialValues={{
              fullName: "",
              phoneNumber: "",
              password: "",
              confirmPassword: "",
              role: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ errors, touched }) => (
              <Form className="formContainer">
                {errors.fullName && touched.fullName ? (
                  <div className="formError">
                    Full Name is {errors.fullName} !
                  </div>
                ) : null}
                <Field
                  name="fullName"
                  placeholder="Full Name"
                  className="formItems"
                />

                {errors.phoneNumber && touched.phoneNumber ? (
                  <div className="formError">{errors.phoneNumber} !</div>
                ) : null}
                <Field
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className="formItems"
                />

                {errors.password && touched.password ? (
                  <div className="formError">
                    Password is {errors.password} !
                  </div>
                ) : null}
                <Field
                  name="password"
                  type="text"
                  placeholder="Password"
                  className="formItems"
                />

                {errors.confirmPassword && touched.confirmPassword ? (
                  <div className="formError">{errors.confirmPassword} !</div>
                ) : null}
                <Field
                  name="confirmPassword"
                  type="text"
                  placeholder="Confirm Password"
                  className="formItems"
                />

                {errors.role && touched.role ? (
                  <div className="formError">Role is {errors.role} !</div>
                ) : null}
                <Field name="role" placeholder="Role" className="formItems" />

                <button type="submit" className="myButton">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};
export default Register;
