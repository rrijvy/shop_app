import React from "react";
import { connect } from "react-redux";

import ProductCard from "./../../components/productCard/productCard.component";

import "./products.styles.scss";

const Products = ({products}) => {
  return (
    <div className="products">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
    return {
        products: state.product.products
    }
}

export default connect(mapStateToProps)(Products);
