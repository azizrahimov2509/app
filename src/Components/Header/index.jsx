import React from "react";
import { header, container, logo, list } from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Badge, Popover, List, Button, message } from "antd";
import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";
import { removeFromCart } from "../../store/CartSlice";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalItemsCount = cartItems.reduce(
    (total, item) => total + item.count,
    0
  );

  const cartContent = (
    <div style={{ width: 300 }}>
      <List
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item
            actions={[
              <DeleteOutlined
                onClick={() => {
                  message.warning("Item removed from cart");
                  dispatch(removeFromCart({ id: item.id }));
                }}
                style={{ color: "red", cursor: "pointer", zoom: 1.7 }}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={
                <img src={item.image} alt={item.title} width={50} height={50} />
              }
              title={item.title}
              description={`Quantity: ${item.count} | Price: ${item.price}$`}
            />
          </List.Item>
        )}
      />
      <Button
        type="primary"
        style={{ width: "100%", marginTop: "10px" }}
        onClick={() => navigate("/selected-cart")}
      >
        Checkout
      </Button>
    </div>
  );

  return (
    <header className={header}>
      <div className={container}>
        <a href="/" className={logo}>
          LOGO
        </a>
        <nav>
          <ul className={list}>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
        <Popover content={cartContent} trigger="hover" placement="bottomRight">
          <Badge count={totalItemsCount}>
            <ShoppingCartOutlined
              style={{ zoom: 3, color: "white", cursor: "pointer" }}
            />
          </Badge>
        </Popover>
      </div>
    </header>
  );
}
