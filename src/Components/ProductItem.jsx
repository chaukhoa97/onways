import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Rate, Card } from 'antd';
const { Meta } = Card;

const ProductItem = (props) => {
  let title = props.title;
  // if (title.length > 35) {
  //   title = title.slice(0, 30) + '...';
  // }

  function roundHalf(num) {
    return Math.round(num * 2) / 2;
  }

  return (
    <Card
      hoverable
      cover={
        <img
          className="product__image p-4"
          src={props.image}
          alt={props.title}
        />
      }
      actions={[
        <FontAwesomeIcon icon="fa-regular fa-heart" key="heart" size="lg" />,
        <FontAwesomeIcon icon="fa-solid fa-cart-plus" key="add" size="lg" />,
      ]}
    >
      <div className="product__title">
        <h4 className="bold fs-3">{title}</h4>
      </div>
      <div className="d-flex align-items-center mt-1">
        <Rate
          className="fs-4"
          disabled
          value={roundHalf(props.rating.rate)}
          allowHalf
        />
        <p className="ms-2 mb-0 d-inline roboto fs-4 product__rating-count">
          {`(${props.rating.count})`}
        </p>
      </div>
      <p className="fs-2 price mt-3 mb-0">{props.price}</p>
    </Card>
  );
};

export default ProductItem;
