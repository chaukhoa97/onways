import { Layout } from 'antd';
import MainLayout from '../Layout/MainLayout';
import { useForm } from 'react-hook-form';

function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <MainLayout>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  {...register('password', { required: true })}
                />
                {errors.password && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  {...register('confirmPassword', { required: true })}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default SignUpPage;
