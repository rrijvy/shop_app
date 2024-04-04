"use client";

import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import CartDropdown from "./cartDropdown";
import Storage from "@/helpers/storage";

const NavigatonBar = () => {
  const [showCartPopover, setCartPopoverStatus] = useState(Storage.ShowCartPopover || false);

  const changeCartPopoverStatus = () => {
    setCartPopoverStatus(!showCartPopover);
  };

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
            <Link href="/contactUs">
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
      <CartDropdown show={showCartPopover} cartItems={[]} />
    </header>
  );
};

export default NavigatonBar;
