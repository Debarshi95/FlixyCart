import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Button, Input, Typography } from 'components';
import { signUp } from 'services/flixycartApi';
import { validateRegister } from 'utils/validations';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import { setItem } from 'utils/helperFuncs';
import './Signup.scss';

const Signup = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    const { username, email, password, confirmPassword } = values;
    try {
      const res = await signUp({ username, email, password, confirmPassword });

      if (res?.id) {
        setUser({ ...res });
        setItem('user', res.data);
        navigate('/', { replace: true });
      }
    } catch (err) {
      let { message = {} } = err.response.data || {};
      if (typeof message === 'string') {
        message = { error: message };
      }
      resetForm({
        values: { ...values, password: '', confirmPassword: '' },
        errors: { ...message },
        touched: {
          password: true,
          confirmPassword: true,
        },
      });
    }
  };
  if (user?.id) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="Signup__root">
      <div className="Signup__formContainer d-flex flex-col">
        <Typography variant="h5" className="Typography--primary mb-1 mt-1 text-center">
          Signup to get started
        </Typography>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validateRegister()}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit: handleFormikSubmit, isSubmitting, values, errors, isValid }) => {
            return (
              <>
                {errors?.error && (
                  <Typography variant="p" className="Typography--error text-center" size="xs">
                    {errors.error || 'This is a error'}
                  </Typography>
                )}
                <Form autoComplete="off" onSubmit={handleFormikSubmit}>
                  <Input
                    hasLabel
                    label="Username"
                    name="username"
                    type="text"
                    placeholder="johndoe23"
                    value={values.username}
                  />
                  <Input
                    hasLabel
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="johndoe@xyz.com"
                    value={values.email}
                  />
                  <Input
                    hasLabel
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="******"
                    value={values.password}
                  />
                  <Input
                    hasLabel
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="*******"
                    value={values.confirmPassword}
                  />
                  <Button
                    component="button"
                    type="submit"
                    variant="contained"
                    className="Signup__button text-bold"
                    disabled={
                      isSubmitting ||
                      !isValid ||
                      Boolean(
                        values.username === '' ||
                          values.email === '' ||
                          values.password === '' ||
                          values.confirmPassword === ''
                      )
                    }
                  >
                    {isSubmitting ? 'Submitting...' : 'Signup'}
                  </Button>
                </Form>
              </>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
