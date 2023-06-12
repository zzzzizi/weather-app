import './register.css';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Sex, login } from '../../features/userSlice';

export type User = {
  email: string;
  name: string;
  sex: Sex;
  userId: number;
  password: string;
  confirmPassword: string;
  myCities: Array<string>;
};

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stringifiedUser = localStorage.getItem('user');
  const users: Array<User> = [];
  if (stringifiedUser !== null) {
    users.push(...JSON.parse(stringifiedUser));
  }

  const userEmail = users.map(({ email }) => email);
  const userName = users.map(({ name }) => name);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required('email is required')
      .email('email format is not standardized')
      .notOneOf(userEmail, 'Email is used'),
    name: yup
      .string()
      .required('Name is required')
      .notOneOf(userName, 'Name is used'),
    sex: yup.mixed().oneOf(['male', 'female', 'other']).nullable(),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(12, 'Password must not exceed 12 characters'),
    confirmPassword: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password')], 'Confirm Password does not match'),
    agreement: yup
      .boolean()
      .oneOf([true], 'You need to accept the terms and conditions'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      sex: 'other' as Sex,
      password: '',
      confirmPassword: '',
      userId: 0,
      agreement: false,
      myCities: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const id = Math.floor(Math.random() * 100000000);
      values.userId = id;
      values.myCities = [];
      if (values) {
        const { agreement, ...rest } = values;

        users.push(rest);
        localStorage.setItem('user', JSON.stringify(users));
        dispatch(login(rest));

        navigate('/registered');
      }
    },
  });

  return (
    <div className="register-container">
      <div className="register-p">Register</div>
      <form className="register-form" onSubmit={formik.handleSubmit}>
        <div className="register-div">
          <label className="register-label">E-mail:</label>
          <input
            className={`${
              formik.touched.email && formik.errors.email
                ? 'errorRegister-input'
                : 'register-input'
            }`}
            id="email"
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>
        <div className="error-div">
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="register-div">
          <label className="register-label">name:</label>
          <input
            className={`${
              formik.touched.name && formik.errors.name
                ? 'errorRegister-input'
                : 'register-input'
            }`}
            id="name"
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
        </div>
        <div className="error-div">
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="register-div">
          <label className="register-label">sex:</label>
          <select
            className="register-input"
            id="sex"
            name="sex"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.sex}
          >
            <option value="other">Other</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="error-div">
          {formik.touched.sex && formik.errors.sex ? (
            <div>{formik.errors.sex}</div>
          ) : null}
        </div>
        <div className="register-div">
          <label className="register-label">Password:</label>
          <input
            className={`${
              formik.touched.password && formik.errors.password
                ? 'errorRegister-input'
                : 'register-input'
            }`}
            id="password"
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </div>
        <div className="error-div">
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="register-div">
          <label className="register-label">Confirm Password:</label>
          <input
            className={`${
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? 'errorRegister-input'
                : 'register-input'
            }`}
            type="password"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
        </div>
        <div className="error-div">
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div>{formik.errors.confirmPassword}</div>
          ) : null}
        </div>
        <div>
          <div>
            <label>terms and conditions</label>
            <input
              type="checkbox"
              name="agreement"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={String(formik.values.agreement)}
            />
          </div>
          <div className="error-div">
            {formik.touched.agreement && formik.errors.agreement ? (
              <div>{formik.errors.agreement}</div>
            ) : null}
          </div>
        </div>

        <div className="submit-div">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};
