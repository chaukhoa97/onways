import { Col, Layout, Row } from 'antd';
import MainLayout from '../Layout/MainLayout';
import Edit from '../Layout/User/Edit';
import Orders from '../Layout/User/Orders';
import Profile from '../Layout/User/Profile';
import UserSider from '../Layout/User/UserSider';
import Wish from '../Layout/User/Wish';
import {
  Route,
  Switch,
  Redirect,
  NavLink,
  Link,
  useParams,
} from 'react-router-dom';

const UserPage = () => {
  const params = useParams();
  console.log(params);
  return (
    <MainLayout>
      <Layout.Content>
        <Row>
          <Col xs={23} lg={5}>
            <div className="bg-white p-4 m-4">
              <UserSider></UserSider>
            </div>
          </Col>
          <Col xs={23} lg={17}>
            <div className="bg-white p-4 m-4">
              {params.mode === 'profile' && <Profile></Profile>}
              {params.mode === 'edit' && <Edit></Edit>}
              {params.mode === 'orders' && <Orders></Orders>}
              {params.mode === 'wish' && <Wish></Wish>}
            </div>
          </Col>
        </Row>
      </Layout.Content>
    </MainLayout>
  );
};

export default UserPage;
