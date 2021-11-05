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

const UserSider = () => {
  const history = useHistory();
  const { width, height } = useWindowSize();
  const params = useParams();
  console.log(params.mode);
  const [selectedKey, setSelectedKey] = useState('profile');
  const handleKeyChange = useCallback(
    (e) => {
      history.push(`/user/${e.key}`);
      setSelectedKey(e.key);
      console.log(e.key);
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
        key="profile"
        icon={<FontAwesomeIcon icon="fa-solid fa-user" />}
      >
        <span>Thông tin</span>
      </Menu.Item>
      <Menu.Item
        key="edit"
        icon={<FontAwesomeIcon icon="fa-solid fa-user-pen" />}
      >
        <span>Chỉnh sửa</span>
      </Menu.Item>
      <Menu.Item
        key="orders"
        icon={<FontAwesomeIcon icon="fa-solid fa-cart-shopping" />}
      >
        <span>Đơn hàng</span>
      </Menu.Item>
      <Menu.Item key="wish" icon={<FontAwesomeIcon icon="fa-solid fa-heart" />}>
        <span>Yêu thích</span>
      </Menu.Item>
    </Menu>
  );
};

export default UserSider;
