import { type Component, type JSX } from "solid-js";
import clsx from "clsx";

interface DialogProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  visible: boolean;
  title?: string;
  onClose: () => void;
}

const Dialog: Component<DialogProps> = (props) => {
  return (
    <>
      {props.visible && (
        <>
          <view
            class={clsx(
              "fixed left-0 right-0 top-0 bottom-0 z-100 bg-black bg-opacity-30 transition-all-400"
            )}
            onClick={props.onClose}
          />
          <view
            class={clsx(
              "w-8_10 min-h-sm bg-white fixed left-1_2 top-1_2 translate-x--1_2 translate-y--1_2 z-200 rounded-xl p-4"
            )}
          >
            <view class="flex items-center justify-between">
              <text>{props.title}</text>
              <icon type="cancel" color="black" onClick={props.onClose}></icon>
            </view>
            {props.children}
          </view>
        </>
      )}
    </>
  );
};

export default Dialog;
