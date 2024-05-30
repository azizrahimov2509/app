import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Typography, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Title from "../Title";
import { gridContainer, cardFooter, img_container } from "./style.module.css";
import { removeFromCart } from "../../store/CartSlice";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

export default function SelectedCart() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="container" style={{ padding: "20px" }}>
      <Title text="Selected Items" />
      {cartItems.length ? (
        <div className={gridContainer}>
          {cartItems.map(({ id, title, description, image, price, count }) => (
            <Card
              hoverable
              key={id}
              style={{ width: 400 }}
              cover={<img alt={title} src={image} width={400} height={400} />}
            >
              <div className={cardFooter}>
                <h3>{price}$</h3>
                <Button
                  onClick={() => {
                    message.warning("Item removed from cart");
                    dispatch(removeFromCart({ id }));
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  <DeleteOutlined
                    style={{
                      color: "red",
                      zoom: 1.7,
                    }}
                  />
                </Button>
              </div>
              <Meta
                title={title}
                description={`Quantity: ${count} | ${description}`}
              />
              <Typography.Paragraph style={{ margin: 0 }}>
                Quantity: {count}
              </Typography.Paragraph>
            </Card>
          ))}
        </div>
      ) : (
        <Typography.Title
          level={3}
          style={{ textAlign: "center", color: "red" }}
        >
          There is no selected products
        </Typography.Title>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          type="primary"
          style={{ width: "40%", marginTop: "10px" }}
          onClick={handleBackToHome}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
