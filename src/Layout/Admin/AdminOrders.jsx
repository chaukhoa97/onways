import { Button, Modal, Table, Tooltip, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../Redux/user';
import { adminActions } from '../../Redux/admin';
import { handleItemsDetail } from '../User/Orders';
import { useState, useEffect, useCallback, useRef, useContext } from 'react';
import _ from 'lodash';

const AdminOrders = () => {
  const { Option } = Select;
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.admin.orders);
  console.log(orders);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleDeleteButton = useCallback((id) => {
    setShowDelete(true);
    setDeleteItemId(id);
  }, []);

  const handleCancelDelete = useCallback(() => {
    setShowDelete(false);
  }, []);

  const handleConfirmDelete = useCallback(
    (id) => {
      dispatch(userActions.deleteOrder(id));
      dispatch(adminActions.deleteOrder(id));
      setShowDelete(false);
    },
    [dispatch]
  );

  const handleStatus = useCallback(
    (value, id) => {
      setSelectedValue(value);
      dispatch(userActions.updateOrder({ status: value, id }));
      dispatch(adminActions.updateOrder({ status: value, id }));
    },
    [dispatch]
  );

  const columns = [
    {
      title: 'Trạng thái',
      dataIndex: 'id',
      key: 'status',
      align: 'center',
      render: (id) => {
        const status = orders[orders.findIndex((o) => o.id === id)].status;
        let label;
        if (status == 0) {
          label = 'Chờ xác nhận';
        }
        if (status == 1) {
          label = 'Đã xác nhận';
        }
        if (status == 2) {
          label = 'Đang giao hàng';
        }
        if (status == 3) {
          label = 'Hoàn tất';
        }
        return (
          <Select
            style={{ width: '100%' }}
            defaultValue={label}
            onChange={(value) => handleStatus(value, id)}
          >
            <Option key="0" value="0">
              Chờ xác nhận
            </Option>
            <Option key="1" value="1">
              Đã xác nhận
            </Option>
            <Option key="2" value="2">
              Đang giao hàng
            </Option>
            <Option key="3" value="3">
              Hoàn tất
            </Option>
          </Select>
        );
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      render: (time) => {
        return new Date(time).toLocaleString();
      },
    },
    {
      title: 'Người nhận',
      dataIndex: 'address',
      key: 'receiver',
      align: 'center',
      render: (address) => {
        return (
          <>
            <p className="bold">{address.name}</p>
            <p>{address.phone}</p>
            <p>{address.detail}</p>
          </>
        );
      },
    },
    {
      title: 'Số tiền',
      dataIndex: 'items',
      key: 'total',
      align: 'center',
      render: (items) => (
        <p className="mb-0 bold" style={{ color: '#3d56b2' }}>
          {_.round(
            _.sumBy(items, (item) => item.data.price),
            2
          )}
        </p>
      ),
    },
    {
      title: 'Tài khoản đặt',
      dataIndex: 'orderAccount',
      key: 'orderAccount',
      align: 'center',
    },
    {
      title: 'Chi tiết',
      dataIndex: 'items',
      key: 'order detail',
      align: 'center',
      render: (items) => (
        <Button onClick={() => handleItemsDetail(items)}>XEM</Button>
      ),
    },
    {
      title: 'Thao tác',
      dataIndex: 'id',
      key: 'delete',
      align: 'center',
      render: (id) => (
        <Button danger onClick={() => handleDeleteButton(id)}>
          XÓA
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Table
        columns={columns}
        dataSource={orders}
        pagination={false}
        bordered
      />
      <Modal
        visible={showDelete}
        title="Xóa đơn hàng"
        footer={[
          <Button key="cancel" onClick={handleCancelDelete}>
            Hủy
          </Button>,
          <Button
            key="confirm"
            type="primary"
            onClick={() => handleConfirmDelete(deleteItemId)}
          >
            Đồng ý
          </Button>,
        ]}
      >
        <p>Bạn có chắc muốn xóa đơn hàng chứ?</p>
      </Modal>
    </div>
  );
};

export default AdminOrders;
