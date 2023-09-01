import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../../features/userSlice';
import { fetchCityData } from 'features/weatherSlice';
import { useDispatch } from 'react-redux';
import { Sex } from '../../features/userSlice';
import './login.css';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [passwordErr, setPasswordErr] = useState<boolean>(false);

  const stringifiedUser = localStorage.getItem('user');
  const user: Array<{
    email: string;
    name: string;
    sex: Sex;
    userId: number;
    password: string;
    confirmPassword: string;
    myCities: Array<string>;
  }> = [];
  if (stringifiedUser !== null) {
    user.push(...JSON.parse(stringifiedUser));
  }
  //const userEmail = user.map(({ email }) => email);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required('email is required')
      .email('email format is not standardized'),
    // .oneOf(userEmail, 'Email does not exist'),

    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(12, 'Password must not exceed 12 characters'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const loginUser = user.find((element) => element.email === values.email);

      if (loginUser && loginUser.password === values.password) {
        dispatch(login(loginUser));
        loginUser.myCities.map((city) => dispatch(fetchCityData(city)));
        console.log(loginUser);
        navigate('/logged');
      } else if (loginUser) {
        setEmailErr(false);
        setPasswordErr(true);
      } else {
        setEmailErr(true);
        setPasswordErr(false);
      }
    },
  });
  return (
    <form className="login__form" onSubmit={formik.handleSubmit}>
      <h1>Login</h1>
      <div className="login__field">
        <div className="login__field--up">
          <label className="login__label">E-mail:</label>
          <input
            className={`${
              (formik.touched.email && formik.errors.email) || emailErr === true
                ? 'login__input--err'
                : 'login__input'
            }`}
            id="email"
            type="email"
            name="email"
            onChange={(e) => {
              formik.handleChange(e);
              setEmailErr(false);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>
        <div className="login__error">
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
          {emailErr === true && <div>E-mail does not exist</div>}
        </div>
      </div>
      <div className="login__field">
        <div className="login__field--up">
          <label className="login__label">Password:</label>
          <input
            className={`${
              (formik.touched.password && formik.errors.password) ||
              passwordErr === true
                ? 'login__input--err'
                : 'login__input'
            }`}
            id="password"
            type="password"
            name="password"
            onChange={(e) => {
              formik.handleChange(e);
              setPasswordErr(false);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </div>
        <div className="login__error">
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
          {passwordErr === true && <div>Your password was wrong</div>}
        </div>
      </div>
      <div>
        <input className="login__submit" type="submit" value="Log in" />
      </div>
      <div>
        <Link to="/register">Register</Link>
      </div>
    </form>
  );
};
