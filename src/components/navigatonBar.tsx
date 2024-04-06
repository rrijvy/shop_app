"use client";

import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Cart from "./cart";
import { ICartItem } from "@/models/ICartItem";

const NavigatonBar = () => {
  const [showCartPopover, setCartPopoverStatus] = useState(false);

  const changeCartPopoverStatus = () => {
    setCartPopoverStatus(!showCartPopover);
  };

  const cartItems: Array<ICartItem> = [
    {
      cartItemId: "1",
      productId: "",
      name: "Throwback Hip Bag",
      href: "#",
      color: "Salmon",
      price: "$90.00",
      quantity: 1,
      imageSrc: "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
      imageAlt: "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
    },
    {
      cartItemId: "2",
      productId: "",
      name: "Medium Stuff Satchel",
      href: "#",
      color: "Blue",
      price: "$32.00",
      quantity: 1,
      imageSrc: "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
      imageAlt: "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    {
      cartItemId: "2",
      productId: "",
      name: "Medium Stuff Satchel",
      href: "#",
      color: "Blue",
      price: "$32.00",
      quantity: 1,
      imageSrc: "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
      imageAlt: "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    {
      cartItemId: "2",
      productId: "",
      name: "Medium Stuff Satchel",
      href: "#",
      color: "Blue",
      price: "$32.00",
      quantity: 1,
      imageSrc: "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
      imageAlt: "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    {
      cartItemId: "2",
      productId: "",
      name: "Medium Stuff Satchel",
      href: "#",
      color: "Blue",
      price: "$32.00",
      quantity: 1,
      imageSrc: "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
      imageAlt: "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    {
      cartItemId: "2",
      productId: "",
      name: "Medium Stuff Satchel",
      href: "#",
      color: "Blue",
      price: "$32.00",
      quantity: 1,
      imageSrc: "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
      imageAlt: "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    {
      cartItemId: "2",
      productId: "",
      name: "Medium Stuff Satchel",
      href: "#",
      color: "Blue",
      price: "$32.00",
      quantity: 1,
      imageSrc: "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
      imageAlt: "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    {
      cartItemId: "2",
      productId: "",
      name: "Medium Stuff Satchel",
      href: "#",
      color: "Blue",
      price: "$32.00",
      quantity: 1,
      imageSrc: "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
      imageAlt: "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
  ];

  return (
    <header>
      <div className="navbar">
        <Link href="/">
          <div className="navbar-logo-container">
            <Image src="/svgs/shop.svg" alt="Shop Logo" className="dark:invert" width={100} height={24} priority />
          </div>
        </Link>
        <div className="navbar-menu">
          <div className="navbar-menu-ul">
            <Link href="/shop">
              <div className="navbar-menu-ul-li">
                <span>SHOP</span>
              </div>
            </Link>
            <Link href="/contactus">
              <div className="navbar-menu-ul-li">
                <span>CONTACT US</span>
              </div>
            </Link>
            <Link href="/signIn">
              <div className="navbar-menu-ul-li">
                <span>SIGN IN</span>
              </div>
            </Link>
            <div className="navbar-menu-ul-li">
              <span className="cart-logo" onClick={changeCartPopoverStatus}>
                <React.Fragment>
                  <FontAwesomeIcon icon={faBagShopping} size="3x" />
                  <span>{5}</span>
                </React.Fragment>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Cart show={showCartPopover} onClose={() => setCartPopoverStatus(false)} products={cartItems} />
    </header>
  );
};

export default NavigatonBar;
