import MainLayout from '../Layout/MainLayout';
import { Layout, Row, Col, Tag, Pagination } from 'antd';
import ProductItem from '../Components/ProductItem';
import { useWindowSize } from 'react-use';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

const { Sider, Content } = Layout;
const { CheckableTag } = Tag;

const ProductsPage = (props) => {
  const ITEMS_PER_PAGE = 6;
  const items = useSelector((store) => store.items.data);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const currentPageItems = items.slice(
    currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const tags = ['Quần áo nam', 'Quần áo nữ', 'Đồ điện tử', 'Trang sức'];
  const arr = [...Array(5).keys()]; // [0, 1, 2, 3, 4]
  const { width, height } = useWindowSize();
  console.log(items);

  return (
    <MainLayout>
      <Layout>
        <Sider
          theme="light"
          width={width > 425 ? `25%` : `${(width * 3) / 4}px`}
          breakpoint="xs"
          collapsedWidth="0"
          style={{
            zIndex: 2,
            height: height,
            position: width <= 425 && 'fixed',
          }}
        >
          {tags.map((tag) => (
            <CheckableTag key={tag}>{tag}</CheckableTag>
          ))}
        </Sider>
        <Content className="p-4">
          <Row gutter={[24, 24]} style={{ justifyContent: 'start' }}>
            {currentPageItems.map((i) => (
              <Col span={24} md={12} xl={8} key={i.id}>
                <ProductItem
                  title={i.title}
                  price={i.price}
                  image={i.image}
                  rating={i.rating}
                ></ProductItem>
              </Col>
            ))}
          </Row>
          <div className="pagination">
            <Pagination
              total={items.length}
              showTotal={(total) => `Tìm thấy ${total} sản phẩm`}
              defaultPageSize={ITEMS_PER_PAGE}
              defaultCurrent={1}
              onChange={handlePageChange}
            ></Pagination>
          </div>
        </Content>
      </Layout>
    </MainLayout>
  );
};

export default ProductsPage;
