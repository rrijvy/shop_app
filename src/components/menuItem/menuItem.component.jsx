import React from "react";

import "./menuItem.styles.scss";

const MenuItem = ({ category }) => {
  let style = {
    backgroundImage: `url(${category.imgUrl})`
  }
  return (
    <div className="menu-item" style={style}>
      <div className="content">
        <h1 className="title">{category.name}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
};

export default MenuItem;
