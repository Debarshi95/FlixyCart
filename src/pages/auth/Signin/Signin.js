import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Button, Input, Typography } from '../../../components';
import { signIn } from '../../../services/flixycartApi';
import { validateLogin } from '../../../utils/validations';
import { useAuth } from '../../../providers/AuthProvider/AuthProvider';
import './Signin.scss';
import { setItem } from '../../../utils/helperFuncs';

const Signin = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    const { email, password } = values;

    try {
      const res = await signIn({ email, password });
      if (res.status === 200) {
        setUser(res.data);
        setItem('user', res.data);
        navigate('/', { replace: true });
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
        <Typography variant="h5" className="Typography--primary my-2 text-center">
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
          {({ handleSubmit: handleFormikSubmit, isSubmitting, values, errors, isValid }) => {
            return (
              <>
                {errors?.error && (
                  <Typography variant="p" className="Typography--error Typography--xs text-center">
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
