import React, { useEffect } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Card } from "antd";
import Title from "../Title";
import {
  gridContainer,
  cardFooter,
  img_container,
  increm,
  dicrem,
} from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../store/ProductsSlice";
import { addToCart, increment, decrement } from "../../store/CartSlice";
import { message } from "antd";

export default function Products() {
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((result) => dispatch(add(result)));
  }, [dispatch]);

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Product added to cart",
    });
  };

  const findProductInCart = (id) => cart.find((item) => item.id === id);

  return (
    <>
      {contextHolder}
      <section>
        <div className="container">
          <Title text={"Mahsulotlar"} />

          <Card.Grid className={gridContainer}>
            {products.length ? (
              products.map(({ id, title, description, image, price }) => {
                const productInCart = findProductInCart(id);
                return (
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

                      {productInCart ? (
                        <div>
                          <Button
                            onClick={() => dispatch(decrement({ id }))}
                            style={{
                              cursor: "pointer",
                            }}
                            className={increm}
                          >
                            -
                          </Button>
                          <span style={{ padding: "0 3px" }}>
                            {productInCart.count}
                          </span>
                          <Button
                            onClick={() => dispatch(increment({ id }))}
                            style={{
                              cursor: "pointer",
                            }}
                            className={dicrem}
                          >
                            +
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => {
                            success();
                            dispatch(
                              addToCart({
                                id,
                                title,
                                description,
                                image,
                                price,
                              })
                            );
                          }}
                          style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                          }}
                        >
                          <ShoppingCartOutlined
                            style={{
                              color: "black",
                              zoom: 1.7,
                            }}
                          />
                        </Button>
                      )}
                    </div>
                    <Card.Meta
                      title={title}
                      description={
                        description.split(" ").slice(0, 20).join(" ") + "..."
                      }
                    />
                  </Card>
                );
              })
            ) : (
              <div className={img_container}>
                <img
                  src="https://i.pinimg.com/originals/36/3c/2e/363c2ec45f7668e82807a0c053d1e1d0.gif"
                  alt="loading"
                  width={800}
                  height={600}
                />
              </div>
            )}
          </Card.Grid>
        </div>
      </section>
    </>
  );
}
