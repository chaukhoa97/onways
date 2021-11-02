import { Layout, Form, Input } from 'antd';
import MainLayout from '../Layout/MainLayout';
import { useForm, Controller, useController } from 'react-hook-form';
import { Route, Switch, Link } from 'react-router-dom';
import SignUpPage from './SignUpPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AccountPage() {
  return (
    <MainLayout>
      <Layout.Content>
        <SignIn></SignIn>
        <Link to="/account/sign-up">Sign Up</Link>
      </Layout.Content>
    </MainLayout>
  );
}

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm();
  const { field } = useController({ name: 'email' });

  const onSubmit = (data) => console.log(data);
  console.log(watch(['email', 'password']));
  return (
    <Layout.Content>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              prefix={<FontAwesomeIcon icon="fa-solid fa-user" />}
              placeholder="bruh"
            />
          )}
        />
        {errors.email && <span>This field is required</span>}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              prefix={<FontAwesomeIcon icon="fa-solid fa-lock" />}
              placeholder="bruh"
            />
          )}
        />
        <input type="submit" />
      </form>
    </Layout.Content>
  );
}

export default AccountPage;
