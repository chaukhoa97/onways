import MainLayout from '../Layout/MainLayout';
import { useParams } from 'react-router';
import { Layout, Row, Col, Image, Rate, Button } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { roundHalf } from '../Components/ProductItem';
import { useDispatch } from 'react-redux';
import { userActions } from '../Redux/user';
import { useSelector } from 'react-redux';

const { Content } = Layout;
const ProductDetailPage = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.productId;
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(false);
  const wishList = useSelector((state) => state.user.wishList);

  useEffect(() => {
    setLoading(true);
    axios.get(`items/${id}.json`).then((res) => {
      setItemData(res.data);
      setLoading(false);
    });
  }, [id]);
  const handleAddToCart = () => {
    dispatch(userActions.addToCart(itemData));
  };
  const handleAddToWishlist = () => {
    dispatch(userActions.addToWishlist(itemData.id));
  };

  return (
    <MainLayout>
      <Content className="my-sm-5 px-sm-5 my-4">
        {loading ? (
          <div className="d-flex align-items-center">
            <div className="donut"></div>
          </div>
        ) : (
          <Row gutter={{ xs: 0, md: 16 }}>
            <Col xs={24} sm={10} className="d-flex justify-content-center">
              <Image src={itemData?.image} alt={itemData?.title}></Image>
            </Col>
            <Col xs={24} sm={14}>
              <div
                className="detail__content p-4"
                style={{ background: 'white' }}
              >
                <h1 className="bold mb-5">{itemData?.title}</h1>
                <p className="fs-3">{itemData?.description}</p>
                <div className="d-flex align-items-center flex-column flex-sm-row">
                  <Rate
                    className="fs-2 mb-2 mb-sm-0"
                    disabled
                    value={roundHalf(itemData?.rating.rate)}
                    allowHalf
                  />
                  <p className="ms-3 mb-0 d-inline roboto fs-3 product__rating-count bold">
                    {`${itemData?.rating.count} đánh giá`}
                  </p>
                </div>
                <p className="fs-1 price my-3">{itemData?.price}</p>
                <div className="d-flex flex-column flex-sm-row">
                  <Button
                    className="mb-4 mb-sm-0 me-sm-4"
                    type="primary"
                    size="large"
                    icon={
                      <FontAwesomeIcon
                        icon="fa-solid fa-cart-plus"
                        size="xl"
                        className="me-3"
                      />
                    }
                    onClick={handleAddToCart}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                  <Button
                    danger
                    onClick={handleAddToWishlist}
                    size="large"
                    icon={
                      <FontAwesomeIcon
                        icon={`fa-${
                          wishList.includes(Number(id)) ? 'solid' : 'regular'
                        } fa-heart`}
                        size="xl"
                        className="me-3"
                        style={{ color: '#ff0000' }}
                      />
                    }
                  >
                    Yêu thích
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Content>
    </MainLayout>
  );
};

export default ProductDetailPage;
