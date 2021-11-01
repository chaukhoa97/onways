import MainLayout from '../Layout/MainLayout';
import { useParams } from 'react-router';
import { Layout, Row, Col, Image, Rate, Button } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { Content } = Layout;
const ProductDetailPage = (props) => {
  function roundHalf(num) {
    return Math.round(num * 2) / 2;
  }
  const params = useParams();
  const id = params.productId;
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get(`items/${id}.json`).then((res) => {
      setItemData(res.data);
      setLoading(false);
    });
  }, [id]);

  return (
    <MainLayout>
      <Content className="my-5 px-5">
        {loading ? (
          <div className="d-flex align-items-center">
            <div className="donut"></div>
          </div>
        ) : (
          <Row gutter="60">
            <Col xs={24} sm={10}>
              <Image src={itemData?.image} alt={itemData?.title}></Image>
            </Col>
            <Col xs={24} sm={14}>
              <h1 className="bold mb-5">{itemData?.title}</h1>
              <p className="fs-3">{itemData?.description}</p>
              <div className="d-flex align-items-center">
                <Rate
                  className="fs-2"
                  disabled
                  value={roundHalf(itemData?.rating.rate)}
                  allowHalf
                />
                <p className="ms-3 mb-0 d-inline roboto fs-3 product__rating-count bold">
                  {`${itemData?.rating.count} đánh giá`}
                </p>
              </div>
              <p className="fs-1 price my-3">{itemData?.price}</p>
              <div className="d-flex flex-wrap">
                <div className="me-4">
                  <Button
                    type="primary"
                    size="large"
                    icon={
                      <FontAwesomeIcon
                        icon="fa-solid fa-cart-plus"
                        size="lg"
                        className="me-3"
                      />
                    }
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </div>
                <Button
                  size="large"
                  icon={
                    <FontAwesomeIcon
                      icon="fa-regular fa-heart"
                      size="lg"
                      className="me-3"
                    />
                  }
                >
                  Yêu thích
                </Button>
              </div>
            </Col>
          </Row>
        )}
      </Content>
    </MainLayout>
  );
};

export default ProductDetailPage;
