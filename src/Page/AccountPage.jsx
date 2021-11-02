import { Layout, Form, Input, Button, Space } from 'antd';
import MainLayout from '../Layout/MainLayout';
import { useForm, Controller, useController } from 'react-hook-form';
import { Route, Switch, Link } from 'react-router-dom';
import SignUpPage from './SignUpPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AccountPage() {
  return (
    <MainLayout>
      <Layout.Content>
        <div className="mx-auto mt-5 account__form rounded-3">
          <div className="d-flex justify-content-center">
            <h2 className="active">Đăng nhập</h2>
            <h2>Đăng ký</h2>
          </div>
          <SignIn></SignIn>
        </div>
        <Link to="/account/sign-up">Sign Up</Link>
      </Layout.Content>
    </MainLayout>
  );
}

function SignIn() {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm();

  const onSubmit = (data) => console.log(data);
  console.log(watch(['email', 'password']));
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Space direction="vertical">
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              {...field}
              size="large"
              prefix={<FontAwesomeIcon icon="fa-solid fa-user" />}
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
              size="large"
              prefix={<FontAwesomeIcon icon="fa-solid fa-lock" />}
              placeholder="Password"
            />
          )}
        />
        {errors.password && (
          <span className="account__error">Hãy nhập password của bạn!</span>
        )}
        <Button
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

export default AccountPage;
