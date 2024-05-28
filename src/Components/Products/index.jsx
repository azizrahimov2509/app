import React, { useEffect } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Card } from "antd";
import Title from "../Title";
import { gridContainer, cardFooter } from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../store/ProductsSlice";
import { addToCart } from "../../store/CartSlice";
import { message } from "antd";

export default function Products() {
  const products = useSelector((state) => state.products);
  const addedItemIds = useSelector((state) => state.cart.addedItemIds);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((result) => dispatch(add(result)));
  }, [dispatch]);

  const getItemCount = (id) => {
    const item = cartItems.find((item) => item.id === id);
    return item ? item.count : 0;
  };

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  return (
    <>
      {contextHolder}
      <section>
        <div className="container">
          <Title text={"Mahsulotlar"} />

          <Card.Grid className={gridContainer}>
            {products.length ? (
              products.map(({ id, title, description, image, price }) => (
                <Card
                  hoverable
                  key={id}
                  style={{
                    width: 400,
                  }}
                  cover={
                    <img alt="example" src={image} width={400} height={400} />
                  }
                >
                  <div className={cardFooter}>
                    <h3>{price}$</h3>

                    <Button
                      onClick={() => {
                        success();
                        dispatch(
                          addToCart({ id, title, description, image, price })
                        );
                      }}
                      style={{
                        background: "none", // прозрачный фон
                        border: "none", // без рамки
                        padding: 0, // без отступов
                        cursor: "pointer", // чтобы курсор был в виде руки при наведении
                      }}
                    >
                      <Badge count={getItemCount(id)}>
                        <ShoppingCartOutlined
                          style={{
                            color: addedItemIds.includes(id)
                              ? "white"
                              : "black",
                            background: addedItemIds.includes(id)
                              ? "red"
                              : "white",
                            borderRadius: "50%",
                            zoom: 1.7,
                          }}
                        />
                      </Badge>
                    </Button>
                  </div>
                  <Card.Meta title={title} description={description} />
                </Card>
              ))
            ) : (
              <img
                src="https://i.pinimg.com/originals/36/3c/2e/363c2ec45f7668e82807a0c053d1e1d0.gif"
                alt="loading"
                width={800}
                height={600}
              />
            )}
          </Card.Grid>
        </div>
      </section>
    </>
  );
}
