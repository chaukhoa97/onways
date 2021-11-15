import MainLayout from '../Layout/MainLayout';
import AdminSider from '../Layout/Admin/AdminSider';
import { Row, Col, Layout, Space, Divider, Input, Button, Empty } from 'antd';
import { useParams } from 'react-router';
import AdminOrders from '../Layout/Admin/AdminOrders';
import AdminUsers from '../Layout/Admin/AdminUsers';
import AdminProducts from '../Layout/Admin/AdminProducts';

const AdminPage = () => {
  const params = useParams();
  return (
    <MainLayout>
      <Layout.Content>
        <Row>
          <Col xs={24} lg={5}>
            <div className="bg-white p-4 m-4">
              <AdminSider></AdminSider>
            </div>
          </Col>
          <Col xs={24} lg={19}>
            <div>
              {params.mode === 'orders' && <AdminOrders></AdminOrders>}
              {params.mode === 'users' && <AdminUsers></AdminUsers>}
              {params.mode === 'products' && <AdminProducts></AdminProducts>}
            </div>
          </Col>
        </Row>
      </Layout.Content>{' '}
    </MainLayout>
  );
};

export default AdminPage;
