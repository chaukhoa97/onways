import AddressCard from '../../Components/AddressCard';
import {
  Route,
  Switch,
  Redirect,
  NavLink,
  Link,
  useHistory,
} from 'react-router-dom';
import {
  Row,
  Col,
  Layout,
  Space,
  Divider,
  Input,
  Button,
  Empty,
  PageHeader,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../Redux/user';

const Address = () => {
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.user.addresses);

  const handleAddAddress = () => {
    dispatch(
      userActions.addAddress({
        id: Date.now(),
        name: '',
        address: '',
        phone: '',
      })
    );
  };

  return (
    <div className="m-4 p-4">
      <div className="d-flex flex-column flex-md-row justify-content-between">
        <h1 className="bold" style={{ color: '#3d56b2' }}>
          Địa chỉ của tôi
        </h1>
        <Button
          size="large"
          type="primary"
          icon={
            <FontAwesomeIcon
              icon="fa-solid fa-plus"
              size="lg"
              className="me-2"
            />
          }
          onClick={() => handleAddAddress()}
        >
          Thêm địa chỉ mới
        </Button>
      </div>
      <Divider />
      {addresses.map((a) => (
        <AddressCard
          id={a.id}
          key={a.detail}
          name={a.name}
          phone={a.phone}
          detail={a.detail}
          edit={a.edit}
          add={a.add}
        />
      ))}
    </div>
  );
};

export default Address;
