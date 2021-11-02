import { Layout, Form, Input, Button, Space, message } from 'antd';
import MainLayout from '../Layout/MainLayout';
import { useForm, Controller, useController } from 'react-hook-form';
import { Route, Switch, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../Redux/auth';

function ProfilePage() {
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  return (
    <MainLayout>
      <button
        onClick={() => {
          dispatch(authActions.signOut());
          console.log(auth);
        }}
      >
        Đăng xuất
      </button>
    </MainLayout>
  );
}

export default ProfilePage;
