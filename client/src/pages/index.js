import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(10, "Too Short")
    .max(15, "Too Long")
    .required("Required"),
  password: Yup.string()
    .min(8, "too short")
    .max(20, "too Long")
    .required("Required"),
  role: Yup.string().required("Required"),
});

const Home = () => {
  const handleLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: "username and password received" }),
    };
    try {
      const data = await fetch("http://localhost:4000/login", requestOptions);
      if (data) {
        res.JSON(data);
      } else {
        res.JSON(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container">
        <div>
          <h1>Login</h1>
          <Formik
            initialValues={{
              phoneNumber: "",
              password: "",
              role: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              handleLogin();
            }}
          >
            {({ errors, touched }) => (
              <Form className="formContainer">
                {errors.phoneNumber && touched.phoneNumber ? (
                  <div className="formError">{errors.phoneNumber} !</div>
                ) : null}
                <Field
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className="formItems"
                />

                {errors.password && touched.password ? (
                  <div className="formError">{errors.password} !</div>
                ) : null}
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="formItems"
                />

                {errors.role && touched.role ? (
                  <div className="formError">
                    http://localhost:3000/{errors.role} !
                  </div>
                ) : null}
                <Field name="role" placeholder="Role" className="formItems" />

                <button type="submit" className="myButton">
                  Submit
                </button>
              </Form>
            )}
            <p>Dont have an account?</p>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Home;
