import { Layout, Badge } from 'antd';
import ProductItem from '../Components/ProductItem';
import MainLayout from '../Layout/MainLayout';
const { Header, Footer, Sider, Content } = Layout;

const i = {
  id: 1,
  title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  price: 109.95,
  description:
    'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
  category: "men's clothing",
  image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  rating: {
    rate: 3.9,
    count: 120,
  },
};
const ProductsPage = (props) => {
  return (
    <MainLayout>
      <h1>Products Page</h1>
      <ProductItem
        image={i.image}
        title={i.title}
        rating={i.rating}
        price={i.price}
      ></ProductItem>
    </MainLayout>
  );
};

export default ProductsPage;
