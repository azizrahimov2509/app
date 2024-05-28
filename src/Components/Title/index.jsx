import React from "react";
import { title } from "./style.module.css";

export default function Title({ text }) {
  return <h2 className={title}>{text}</h2>;
}
