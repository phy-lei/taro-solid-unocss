import { type Component, type JSX } from "solid-js";
import { clsx } from "clsx";

interface CardProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  close?: boolean;
  onClose?: () => void;
}

const Card: Component<CardProps> = (props) => {
  return (
    <view
      class={clsx(
        "relative rounded-md border border-dashed leading-6 p-2 border-gray-700",
        props.class
      )}
    >
      {props.close ? (
        <icon
          size="16"
          type="cancel"
          class="absolute right-1 top-1"
          onClick={props.onClose}
        ></icon>
      ) : null}
      {props.children}
    </view>
  );
};
export default Card;
