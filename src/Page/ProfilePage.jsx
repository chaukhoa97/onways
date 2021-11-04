import { Layout, Divider, Row, Col, Input, Button, Space, message } from 'antd';
import MainLayout from '../Layout/MainLayout';
import { useForm, Controller, useController } from 'react-hook-form';
import { Route, Switch, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../Redux/auth';
import { useState, useEffect } from 'react';

function ProfilePage() {
  const localId = useSelector((store) => store.auth.localId);
  const [user, setUser] = useState({
    databaseId: '',
    localId: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    isAdmin: false,
    cart: [],
    orders: [],
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`users.json?orderBy="localId"&equalTo="${localId}"`)
      .then((res) => {
        Object.entries(res.data).forEach(([key, value]) => {
          setUser({
            databaseId: key,
            ...value,
          });
        });
        setLoading(false);
      });
  }, [localId]);

  const dispatch = useDispatch();
  return loading ? (
    <div className="d-flex align-items-center">
      <div className="donut"></div>
    </div>
  ) : (
    <MainLayout>
      <h1>{user.localId + '   ' + user.databaseId}</h1>
      <Button
        type="primary"
        danger
        onClick={() => {
          dispatch(authActions.signOut());
        }}
      >
        Đăng xuất
      </Button>
    </MainLayout>
  );
}

export default ProfilePage;
