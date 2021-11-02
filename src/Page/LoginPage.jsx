import { useState, useEffect } from 'react';
import { Layout, Row, Col, Space, message, Input, Button } from 'antd';
import { useForm, Controller, useController } from 'react-hook-form';
import axios from 'axios';
import { Route, Switch, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MainLayout from '../Layout/MainLayout';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../Redux/auth';

const LoginPage = (props) => {
  const [signUpMode, setSignUpMode] = useState(false);
  const handleModeChange = () => {
    setSignUpMode(!signUpMode);
  };

  return (
    <MainLayout>
      <Layout.Content className="d-flex justify-content-center align-items-center">
        <div className="mx-auto my-5 account__form rounded-3">
          <div className="d-flex justify-content-center mb-3">
            <h2
              className={!signUpMode ? 'active' : undefined}
              onClick={handleModeChange}
            >
              Đăng nhập
            </h2>
            <h2
              className={signUpMode ? 'active' : undefined}
              onClick={handleModeChange}
            >
              Đăng ký
            </h2>
          </div>
          {signUpMode ? <SignUpForm /> : <SignInForm />}
        </div>
      </Layout.Content>
    </MainLayout>
  );
};

export default LoginPage;

function SignInForm() {
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm();
  const signInError = () => {
    message.error('Đăng nhập thất bại: Email hoặc mật khẩu không đúng');
  };
  const signInSuccess = () => {
    message.success('Đăng nhập thành công');
  };
  const onSubmit = (data) => {
    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCKu_tYKQAM4t0Aint-mdHTheBzrbsX4_8',
        {
          email: data.email,
          password: data.password,
          returnSecureToken: true,
        }
      )
      .then((res) => {
        signInSuccess();
        dispatch(
          authActions.signIn({
            localId: res.data.localId,
          })
        );
      })

      .catch((err) => {
        signInError();
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Space size="middle" direction="vertical">
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              {...field}
              size="large"
              prefix={
                <FontAwesomeIcon className="me-3" icon="fa-solid fa-user" />
              }
              placeholder="Email"
            />
          )}
        />
        {errors.email && (
          <span className="account__error">Hãy nhập email của bạn!</span>
        )}
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              size="large"
              prefix={
                <FontAwesomeIcon className="me-3" icon="fa-solid fa-lock" />
              }
              placeholder="Password"
            />
          )}
        />
        {errors.password && (
          <span className="account__error">Hãy nhập password của bạn!</span>
        )}

        <Button
          size="large"
          htmlType="submit"
          type="primary"
          className="d-block mx-auto w-100 mt-2 rounded-pill"
        >
          Đăng nhập
        </Button>
      </Space>
    </form>
  );
}

function SignUpForm() {
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    watch,
    control,
    register,
  } = useForm();
  const signUpError = () => {
    message.error('Đăng ký thất bại, Email đã có người sử dụng');
  };
  const signUpSuccess = () => {
    message.success('Đăng ký thành công');
  };
  const onSubmit = (data) => {
    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCKu_tYKQAM4t0Aint-mdHTheBzrbsX4_8',
        {
          email: data.email,
          password: data.password,
          returnSecureToken: true,
        }
      )
      .then((res) => {
        signUpSuccess();
        dispatch(
          authActions.signIn({
            localId: res.data.localId,
          })
        );
      })
      .catch((err) => {
        signUpError();
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Space size="middle" direction="vertical">
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          }}
          render={({ field }) => (
            <Input
              {...field}
              size="large"
              prefix={
                <FontAwesomeIcon className="me-3" icon="fa-solid fa-user" />
              }
              placeholder="Email"
            />
          )}
        />
        {errors.email && (
          <span className="account__error">Email không đúng định dạng!</span>
        )}
        <Controller
          name="password"
          control={control}
          rules={{ required: true, minLength: 6, maxLength: 20 }}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              size="large"
              prefix={
                <FontAwesomeIcon className="me-3" icon="fa-solid fa-lock" />
              }
              placeholder="Password"
            />
          )}
        />
        {errors.password && (
          <span className="account__error">
            Mật khẩu phải có độ dài từ 6 tới 20 ký tự
          </span>
        )}
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: true,
            validate: (value) => value === watch('password'),
          }}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              size="large"
              prefix={
                <FontAwesomeIcon className="me-3" icon="fa-solid fa-lock" />
              }
              placeholder="Confirm password"
            />
          )}
        />
        {errors.confirmPassword && (
          <span className="account__error">
            Mật khẩu xác nhận không trùng với mật khẩu trên!
          </span>
        )}
        <div className="acceptTerms">
          <input
            type="checkbox"
            className="me-2"
            id="acceptTerms"
            {...register('acceptTerms', { required: true })}
          />
          <label htmlFor="acceptTerms">
            Bấm đăng ký đồng nghĩa với việc tôi đồng ý với các
            <Link to="/home"> điều khoản </Link> của Onways
          </label>
        </div>
        {errors.acceptTerms && (
          <span className="account__error">
            Bạn không thể đăng ký khi chưa đồng ý với những điều khoản của chúng
            tôi!
          </span>
        )}
        <Button
          size="large"
          htmlType="submit"
          type="primary"
          className="d-block mx-auto w-100 mt-2 rounded-pill"
        >
          Đăng ký tài khoản
        </Button>
      </Space>
    </form>
  );
}
