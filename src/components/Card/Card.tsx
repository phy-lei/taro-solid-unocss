import { type Component, type JSX } from "solid-js";
import { clsx } from "clsx";
import { View, Icon } from '@tarojs/components'

interface CardProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  close?: boolean;
  onClose?: () => void;
}

const Card: Component<CardProps> = (props) => {
  return (
    <View
      class={clsx(
        "relative rounded-md border border-dashed leading-6 p-2 border-gray-700",
        props.class
      )}
    >
      {props.close ? (
        <Icon
          size="16"
          type="cancel"
          class="absolute right-1 top-1"
          onClick={props.onClose}
        ></Icon>
      ) : null}
      {props.children}
    </View>
  );
};
export default Card;
