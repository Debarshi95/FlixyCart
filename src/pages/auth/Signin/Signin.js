import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Button, Input, Typography } from 'components';
import { signIn } from 'services/flixycartApi';
import { validateLogin } from 'utils/validations';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import { setItem } from 'utils/helperFuncs';
import './Signin.scss';

const Signin = () => {
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  const { state } = useLocation();

  const handleSubmit = async (values, { resetForm }) => {
    const { email, password } = values;

    try {
      const resUser = await signIn({ email, password });
      if (resUser?.id) {
        const path = state?.pathname || '/';
        setItem('user', { ...resUser });
        navigate(path, { replace: true });
        setUser({ ...resUser });
      }
    } catch (err) {
      let { message = {} } = err.response.data || {};
      if (typeof message === 'string') {
        message = { error: message };
      }
      resetForm({
        values: { ...values, password: '' },
        errors: { ...message },
        touched: {
          password: true,
        },
      });
    }
  };

  if (user?.id) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="Signin__root">
      <div className="Signin__formContainer d-flex flex-col">
        <Typography variant="h5" className="Typography--primary my-1 text-center">
          Signin to continue
        </Typography>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validateLogin()}
          onSubmit={handleSubmit}
        >
          {({
            handleSubmit: handleFormikSubmit,
            isSubmitting,
            values,
            errors,
            isValid,
            setValues,
          }) => {
            return (
              <>
                {errors?.error && (
                  <Typography variant="p" className="Typography--error  text-center" size="xs">
                    {errors.error || 'This is a error'}
                  </Typography>
                )}
                <Form autoComplete="off" onSubmit={handleFormikSubmit}>
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    hasLabel
                    placeholder="johndoe@test.com"
                    value={values.email}
                  />
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    hasLabel
                    placeholder="******"
                    value={values.password}
                  />
                  <div className="my-2">
                    <Button
                      component="button"
                      type="submit"
                      variant="contained"
                      className="Signin__button text-bold"
                      disabled={
                        isSubmitting ||
                        !isValid ||
                        Boolean(values.email === '' || values.password === '')
                      }
                    >
                      {isSubmitting ? 'Submitting...' : 'Login'}
                    </Button>
                    <Button
                      component="button"
                      type="click"
                      variant="contained"
                      className="Signin__button text-bold"
                      disabled={isSubmitting}
                      onClick={() => {
                        setValues({
                          email: process.env.REACT_APP_TEST_EMAIL,
                          password: process.env.REACT_APP_TEST_PASSWORD,
                        });
                      }}
                    >
                      {isSubmitting ? 'Submitting...' : 'Sign in as test user'}
                    </Button>
                  </div>
                </Form>
              </>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Signin;
