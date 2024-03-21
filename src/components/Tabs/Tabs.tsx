import { createSignal, For } from "solid-js";
import clsx from "clsx";
import { CategoryItemDto } from "@/apis/goods/model";
interface Props {
  data: CategoryItemDto[];
  defaultValue: string;
}

export default function Tabs(props: Props) {
  const [value, setValue] = createSignal(props.defaultValue);

  const tabsChanges = (e) => {
    setValue(e.target.dataset.value as string);
  };

  return (
    <view class="flex gap-1 flex-nowrap overflow-x-auto whitespace-nowrap no-scrollbar">
      <For each={props.data}>
        {(item) => (
          <view
            class={clsx(
              "p-2",
              value() === item.value
                ? "border-b-style-solid border-4 border-emerald color-emerald font-500"
                : ""
            )}
            onClick={tabsChanges}
            data-value={item.value}
          >
            {item.name}
          </view>
        )}
      </For>
    </view>
  );
}
