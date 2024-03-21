import { type Component, type JSX } from "solid-js";
import clsx from "clsx";

interface DrawerProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  openDrawer: boolean;
  maskClick?: () => void;
}

const Drawer: Component<DrawerProps> = (props) => {
  return (
    <view
      class={clsx(
        "fixed left-0 right-0 top-102rpx bottom-0 z-10 overflow-hidden",
        !props.openDrawer ? "pointer-events-none" : ""
      )}
    >
      <view
        class={clsx(
          "fixed left-0 right-0 top-102rpx bottom-0 z-100 bg-black bg-opacity-30 transition-all-400",
          props.openDrawer ? "opacity-100 block" : "opacity-0 hidden"
        )}
        onClick={props?.maskClick}
      />

      <view
        class={clsx(
          "bg-white absolute left-0 top-0 z-200 transition-transform-400",
          props.openDrawer ? "translate-y-0" : "translate-y--100%"
        )}
      >
        {props.children}
      </view>
    </view>
  );
};

export default Drawer;
