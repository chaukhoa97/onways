import MainLayout from '../Layout/MainLayout';
import { Layout, Row, Col, Tag, Pagination, Rate, Select } from 'antd';
import ProductItem from '../Components/ProductItem';
import { useWindowSize } from 'react-use';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { itemsActions } from '../Redux/items';

const { Option } = Select;
const { Sider, Content } = Layout;
const { CheckableTag } = Tag;
const ITEMS_PER_PAGE = 6;

const ProductsPage = (props) => {
  const dispatch = useDispatch();
  let showedItems = useSelector((store) => store.items.showedItems);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const currentPageItems = showedItems.slice(
    currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const tags = ['Quần áo nam', 'Quần áo nữ', 'Đồ điện tử', 'Trang sức'];
  const [selectedTags, setSelectedTags] = useState([]);
  const handleTagChange = (tag, checked) => {
    setSelectedTags(
      checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag)
    );
  };

  const [rate, setRate] = useState(0);
  const handleRateChange = (e) => {
    e.currentTarget.dataset.rate != rate
      ? setRate(e.currentTarget.dataset.rate)
      : setRate(0);
  };

  const [priceRange, setPriceRange] = useState(-1);
  const handlePriceRangeChange = (e) => {
    e.currentTarget.dataset.priceRange != priceRange
      ? setPriceRange(e.currentTarget.dataset.priceRange)
      : setPriceRange(-1);
  };

  const [sort, setSort] = useState('');
  const handleSortChange = (value) => {
    setSort(value);
  };

  useEffect(() => {
    dispatch(
      itemsActions.filter({
        category: selectedTags,
        rate,
        priceRange: Number(priceRange),
      })
    );
    dispatch(itemsActions.sort(sort));
    setCurrentPage(1);
  }, [dispatch, priceRange, rate, selectedTags, sort]);

  const { width, height } = useWindowSize();
  return (
    <MainLayout>
      <Layout style={{ background: '#afb9c8' }}>
        <Sider
          width={width > 425 ? `20%` : `${(width * 3) / 4}px`}
          breakpoint="xs"
          collapsedWidth="0"
          style={{
            zIndex: 2,
            height: height,
            position: width <= 425 && 'fixed',
            padding: '0 0 0 10px',
            background: '#afb9c8',
          }}
        >
          <h2 className="fs-2 sider__filter-type">Danh mục</h2>
          {tags.map((tag) => (
            <CheckableTag
              key={tag}
              checked={selectedTags.indexOf(tag) > -1}
              onChange={(checked) => handleTagChange(tag, checked)}
            >
              {tag}
            </CheckableTag>
          ))}
          <h2 className="fs-2 sider__filter-type">Đánh giá</h2>
          <div className="sider__rates">
            <div
              className={`sider__rate ${rate == 4 && 'sider__rate--active'}`}
              data-rate="4"
              onClick={handleRateChange}
            >
              <Rate disabled className="fs-5" value="4"></Rate>
              <span className="fs-4 ms-3">trở lên</span>
            </div>
            <div
              className={`sider__rate ${rate == 3 && 'sider__rate--active'}`}
              data-rate="3"
              onClick={handleRateChange}
            >
              <Rate disabled className="fs-5" value="3"></Rate>
              <span className="fs-4 ms-3">trở lên</span>
            </div>
            <div
              className={`sider__rate ${rate == 2 && 'sider__rate--active'}`}
              data-rate="2"
              onClick={handleRateChange}
            >
              <Rate disabled className="fs-5" value="2"></Rate>
              <span className="fs-4 ms-3">trở lên</span>
            </div>
            <div
              className={`sider__rate ${rate == 1 && 'sider__rate--active'}`}
              data-rate="1"
              onClick={handleRateChange}
            >
              <Rate disabled className="fs-5" value="1"></Rate>
              <span className="fs-4 ms-3">trở lên</span>
            </div>
          </div>
          <h2 className="fs-2 sider__filter-type">Giá thành</h2>
          <p
            className={`sider__price ${
              priceRange == 0 && 'sider__price--active'
            }`}
            data-price-range="0"
            onClick={handlePriceRangeChange}
          >
            Dưới $20
          </p>
          <p
            className={`sider__price ${
              priceRange == 1 && 'sider__price--active'
            }`}
            data-price-range="1"
            onClick={handlePriceRangeChange}
          >
            20 - $100
          </p>
          <p
            className={`sider__price ${
              priceRange == 2 && 'sider__price--active'
            }`}
            data-price-range="2"
            onClick={handlePriceRangeChange}
          >
            100 - $500
          </p>
          <p
            className={`sider__price ${
              priceRange == 3 && 'sider__price--active'
            }`}
            data-price-range="3"
            onClick={handlePriceRangeChange}
          >
            Trên $500
          </p>
        </Sider>
        <Content className="p-4">
          <div className="d-flex flex-right">
            <Select
              placeholder="Sắp xếp theo..."
              style={{ width: 140, marginBottom: '20px', marginLeft: 'auto' }}
              onChange={handleSortChange}
            >
              <Option value="popularity">Độ phổ biến</Option>
              <Option value="rate">Đánh giá</Option>
              <Option value="asc">Giá tăng dần</Option>
              <Option value="desc">Giá giảm dần</Option>
            </Select>
          </div>
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
              total={showedItems.length}
              showTotal={(total) => `Tìm thấy ${total} sản phẩm`}
              defaultPageSize={ITEMS_PER_PAGE}
              defaultCurrent={1}
              current={currentPage}
              onChange={handlePageChange}
              responsive
            ></Pagination>
          </div>
        </Content>
      </Layout>
    </MainLayout>
  );
};

export default ProductsPage;
