import { Button, Descriptions, Spin } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Profile() {
  const user = useSelector((state) => state.user);
  const orders = user.orders;
  const dispatch = useDispatch();

  const orderItems = orders.map((order) => {
    return order.items.reduce((acc, item) => {
      return acc + item.count;
    }, 0);
  });

  const totalItems = orderItems.reduce((acc, item) => {
    return acc + item;
  }, 0);

  const orderSpents = orders.map((order) => {
    return order.items.reduce((acc, item) => {
      return acc + item.price * item.count;
    }, 0);
  });

  const totalSpent = orderSpents.reduce((acc, item) => {
    return acc + item;
  }, 0);

  return user.localId.length === 0 ? (
    <div className="d-flex justify-content-center">
      <Spin size="large" />
    </div>
  ) : (
    <>
      <Descriptions title="Thông tin người dùng">
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="Tên">{user.firstName}</Descriptions.Item>
        <Descriptions.Item label="Họ">{user.lastName}</Descriptions.Item>
        <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
      </Descriptions>
      <Descriptions title="Thống kê" bordered layout="vertical">
        <Descriptions.Item label="Tổng số đơn hàng">
          {user.orders.length}
        </Descriptions.Item>
        <Descriptions.Item label="Tổng số tiền đã chi">
          ${totalSpent}
        </Descriptions.Item>
        <Descriptions.Item label="Số món hàng đã mua">
          {totalItems}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
}

export default Profile;
