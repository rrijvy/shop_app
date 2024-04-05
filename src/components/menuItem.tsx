"use client";

import { ICategory } from "@/models/ICategory";

type Props = {
  category: ICategory;
};

const MenuItem = (props: Props) => {
  let style = { backgroundImage: `url("./images/mens-clothing.jpg")`, backgroundSize: "cover" };

  return (
    <div className="menu-item" style={style}>
      <div className="content">
        <h1 className="title">{props.category.name}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
};

export default MenuItem;
