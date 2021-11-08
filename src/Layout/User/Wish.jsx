import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Empty, Rate, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { roundHalf } from '../../Components/ProductItem';
import { userActions } from '../../Redux/user';
import {
  Route,
  Switch,
  Redirect,
  NavLink,
  Link,
  useHistory,
} from 'react-router-dom';

const Wish = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const wishList = useSelector((state) => state.user.wishList);
  const items = useSelector((state) => state.items.databaseItems);
  const wishItems = items.filter((item) => wishList.includes(item.id));
  return wishItems.length > 0 ? (
    <Row gutter={[24, 24]} className="m-4 p-4 bg-white">
      {wishItems.map((item) => (
        <Col span={24} md={12} xl={8} key={item.id}>
          <Card
            hoverable
            key={item.id}
            cover={
              <img
                className="product__image p-4"
                src={item.image}
                alt={item.title}
                onClick={() => history.push(`/products/${item.id}`)}
              />
            }
            actions={[
              <div
                className="w-100"
                key="wish"
                onClick={() => dispatch(userActions.addToWishlist(item.id))}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-heart-crack"
                  size="xl"
                  style={{ color: '#ff0000' }}
                />
              </div>,
              <div className="w-100" key="add">
                <FontAwesomeIcon
                  icon="fa-solid fa-cart-plus"
                  size="xl"
                  style={{ color: '#5c7aea' }}
                  onClick={() => dispatch(userActions.addToCart(item))}
                />
              </div>,
            ]}
          >
            <div className="product__title">
              <h4 className="bold fs-3">{item.title}</h4>
            </div>
            <div className="d-flex align-items-center mt-1">
              <Rate
                className="fs-4"
                disabled
                value={roundHalf(item.rating.rate)}
                allowHalf
              />
              <p className="ms-2 mb-0 d-inline roboto fs-4 product__rating-count">
                {`(${item.rating.count})`}
              </p>
            </div>
            <p className="fs-2 price mt-3 mb-0">{item.price}</p>
          </Card>
        </Col>
      ))}
    </Row>
  ) : (
    <Empty description="Bạn chưa có sản phẩm yêu thích nào" />
  );
};

export default Wish;
