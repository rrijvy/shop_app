"use client";

import { ICategory } from "@/models/ICategory";

type Props = {
  category: ICategory;
};

const MenuItem = (props: Props) => {
  let style = {
    backgroundImage: `url(${props.category.imageUrl ? props.category.imageUrl : "./images/mens-clothing.jpg"})`,
    backgroundSize: "cover",
  };

  return (
    <div className="menu-item" style={style}>
      <div className="p-2 flex flex-col items-center justify-center m-auto w-1/2 border border-slate-700 bg-opacity-60 bg-stone-200 hover:bg-white">
        <p className="text-2xl font-bold">{props.category.name}</p>
        <p className="text-xl font-semibold">SHOP NOW</p>
      </div>
    </div>
  );
};

export default MenuItem;
