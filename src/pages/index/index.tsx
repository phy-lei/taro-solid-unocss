import { useDidShow } from "@tarojs/taro";
import { View, Image } from '@tarojs/components'
import { createSignal, createMemo, For, onMount } from "solid-js";
import useStore from "@/useHooks/useStore";

import { $needRefresh, $setNeedRefresh } from "@/stores/refresh";
import Card from "@/components/Card/Card";
import HeaderBar from "./components/HeaderBar/HeaderBar";
import Drawer from "@/components/Drawer/Drawer";
import { ROOT_ID } from "@/utils/constants";

export default function Index() {
  const needRefresh = useStore($needRefresh);

  const [showMore, setShowMore] = createSignal(false);
  const [tabsData] = createSignal([
    { name: "猫咪", value: "1" },
    { name: "狗狗", value: "2" },
    { name: "兔子", value: "3" },
  ]);

  return (
    <View class="h-screen flex flex-col Text-xs" id={ROOT_ID}>
      <HeaderBar
        tabsData={tabsData()}
        handleMore={() => setShowMore(true)}
      ></HeaderBar>
      <Drawer openDrawer={showMore()} maskClick={() => setShowMore(false)}>
        <View class="w-full bg-white">
          <View class="flex flex-wrap">
            <For each={tabsData()}>
              {(item) => (
                <View class="whitespace-nowrap m-1" onClick={() => {}}>
                  {item.name}
                </View>
              )}
            </For>
          </View>
          <View class="Text-center">
            <Image
              src="http://192.168.1.127:5500/down.png"
              class="w-40 h-40 pl-4 rotate-180"
              onClick={() => setShowMore(false)}
            ></Image>
          </View>
        </View>
      </Drawer>
      <View class="p-2 flex-1 overflow-y-auto">
        <Card class="mb-2 shadow-[--box-shadow]">
          <View class="font-bold">商品：xxxx</View>
          <View class="font-bold">规格：xxxx</View>
          <View class="font-bold">类别：xxxx</View>
          <View class="font-bold">生产日期：xxxx</View>
          <View class="font-bold">保质期：xxxx 个月</View>
          <View class="font-bold">过期日期：xxxx</View>
        </Card>
      </View>
    </View>
  );
}
