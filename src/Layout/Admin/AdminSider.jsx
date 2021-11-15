import {
  Layout,
  Divider,
  Row,
  Col,
  Input,
  Button,
  Space,
  message,
  Menu,
} from 'antd';
import { useState, useEffect, useCallback, useRef, useContext } from 'react';
import {
  Route,
  Switch,
  Redirect,
  NavLink,
  Link,
  useHistory,
  useParams,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useWindowSize } from 'react-use';

const AdminSider = () => {
  const history = useHistory();
  const { width, height } = useWindowSize();
  const params = useParams();
  const [selectedKey, setSelectedKey] = useState('orders');
  const handleKeyChange = useCallback(
    (e) => {
      history.push(`/admin/${e.key}`);
      setSelectedKey(e.key);
    },
    [history]
  );
  const menuMode = width > 992 ? 'inline' : 'horizontal';

  return (
    <Menu
      mode={menuMode}
      selectedKeys={[params.mode]}
      onClick={handleKeyChange}
    >
      <Menu.Item
        key="orders"
        icon={<FontAwesomeIcon icon="fa-solid fa-truck" />}
      >
        <span>Đơn hàng</span>
      </Menu.Item>
      <Menu.Item
        key="users"
        icon={<FontAwesomeIcon icon="fa-solid fa-users" />}
      >
        <span>Khách hàng</span>
      </Menu.Item>
      <Menu.Item
        key="products"
        icon={<FontAwesomeIcon icon="fa-solid fa-shirt" />}
      >
        <span>Sản phẩm</span>
      </Menu.Item>
    </Menu>
  );
};

export default AdminSider;
