import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import ProductItem from './ProductItem';

const Carousel = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const databaseItems = useSelector((state) => state.items.databaseItems);
  const carouselItems = databaseItems.filter((item) =>
    props.itemIds.includes(item.id)
  );

  return (
    <div>
      <Slider {...settings}>
        {carouselItems.map((i) => (
          <ProductItem
            key={i.id}
            id={i.id}
            title={i.title}
            price={i.price}
            image={i.image}
            rating={i.rating}
          ></ProductItem>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
