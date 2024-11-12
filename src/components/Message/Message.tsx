import { Accessor } from "solid-js";
import { type Component } from "solid-js";
import { View } from '@tarojs/components'
import { cva } from "class-variance-authority";
import "./style.css";

interface MessageProps {
  show: Accessor<boolean>;
  tips: Accessor<string>;
  type: Accessor<"info" | "success" | "error" | "warning">;
}

const messageVariants = cva(
  "fixed left-0 top-0 z-999 h-70 color-white w-full flex center Text-sm font-600",
  {
    variants: {
      variant: {
        show: "drownDown",
        hide: "hideUp",
      },
      type: {
        info: "bg-blue-5",
        success: "bg-green-5",
        error: "bg-red-6",
        warning: "bg-amber",
      },
    },
    defaultVariants: {
      variant: "show",
      type: "info",
    },
  }
);

const Message: Component<MessageProps> = (props) => {
  return (
    <View
      class={messageVariants({
        variant: props.show() ? "show" : "hide",
        type: props.type(),
      })}
    >
      {props.tips()}
    </View>
  );
};

export default Message;
