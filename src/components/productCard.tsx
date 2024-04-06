"use client";

import { IProduct } from "@/models/IProduct";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ProductCard = (props: { product: IProduct }) => {
  return (
    <div className="mt-2 p-2 lg:mt-0 lg:w-1/5 lg:flex-shrink-0">
      <div className="bg-white text-center ring-1 ring-inset ring-gray-900/15 lg:flex lg:flex-col lg:justify-center">
        <img src={props.product.imageSrc} alt={props.product.imageAlt} className="border-b" />
        <div className="p-2 bg-gray-200">
          <p className="font-medium">{props.product.name}</p>
          <p className="font-semibold">{props.product.price}</p>
        </div>
        <button className="bg-stone-800 text-white py-2">
          <FontAwesomeIcon className="mr-3" icon={faCartShopping} width={20} />
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
