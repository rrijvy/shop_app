import React from "react";
import { connect } from "react-redux";

import MenuItem from "./../../components/menuItem/menuItem.component";

import "./homepage.styles.scss";

const Homepage = ({productCategories}) => {
  return (
    <div className="homepage">
      <div className="directory-menu">
        {productCategories.map((category) => 
           <MenuItem key={category.id} category={category} />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    productCategories: state.productCategory.productCategories
  };
};

export default connect(mapStateToProps)(Homepage);
