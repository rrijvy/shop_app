import React from "react";
import { connect } from "react-redux";

import Slider from "infinite-react-carousel";
import ProductCard from "./../../components/productCard/productCard.component";

import "./shop.styles.scss";

const Shop = ({ products, productCategories }) => {
  const settings = {
    accessibility: false,
    arrows: false,
    arrowsBlock: false,
    autoplay: true,
    duration: 400,
    overScan: 1,
    slidesToShow: 3,
    wheel: true,
  };
  return (
    <div className="shop">
      <div className="product-type-container">
        {productCategories.map((type) => (
          <div className="product-type" key={type.id}>
            <div className="product-type-name">
              <h1>{type.name}</h1>
            </div>
            <Slider {...settings}>
              {products
                .filter((product) => product.productTypeId === type.id)
                .map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
            </Slider>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    productCategories: state.productCategory.productCategories,
    products: state.product.products,
  };
};

export default connect(mapStateToProps)(Shop);
