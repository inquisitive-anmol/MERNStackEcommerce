import React from "react";
import { Image } from "@nextui-org/react";

export default function AnimatedLoadingImage(props) {
  return (
    <Image
      onMouseOver={props.setImage ? () => props.setImage(props.index) : () => null}
      width={props.width}
      height={props.height}
      alt={props.imgAlt}
      src={props.imgUrl}
      className={props.className ? props.className : ""}
    />
  );
}
