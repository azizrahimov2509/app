import React from "react";
import { header, container, logo, list } from "./style.module.css";
import { useSelector } from "react-redux";
import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

export default function Header() {
  const cartItems = useSelector((state) => state.cart.items);

  const totalItemsCount = cartItems.reduce(
    (total, item) => total + item.count,
    0
  );
  console.log(cartItems);
  return (
    <header className={header}>
      <div className={container}>
        <a href="#" className={logo}>
          LOGO
        </a>
        <nav>
          <ul className={list}>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>

        <Badge count={totalItemsCount}>
          <ShoppingCartOutlined
            style={{ zoom: 3, color: "white", cursor: "pointer" }}
          />
        </Badge>
      </div>
    </header>
  );
}
