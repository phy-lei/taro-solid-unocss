import { createSignal, Show } from "solid-js";
import clsx from "clsx";
import { ROOT_ID } from "@/utils/constants";
import { encryptPhone } from "@/utils";
import { $user } from "@/stores/user";
import { $needRefresh } from "@/stores/refresh";
import useStore from "@/useHooks/useStore";
import Dialog from "@/components/Dialog/Dialog";
import Card from "@/components/Card/Card";
import $message from "@/components/Message/$message";
import useDirective from "@/useHooks/useDirectives";

const DEFAULT_PHONE = "123";

const regPhone =
  /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/;

export default function Mine() {
  const { model } = useDirective();
  const user = useStore($user);
  const needRefresh = useStore($needRefresh);
  const [visible, setVisible] = createSignal(false);
  const [phone, setPhone] = createSignal(
    user().phone ? user().phone : DEFAULT_PHONE
  );

  const login = () => {
    if (!regPhone.test(phone())) {
      $message({
        tips: `请输入正确的手机号`,
        type: "warning",
      });
      return;
    }
  };

  const platformChange = (e) => {
    const val = e.detail.value;
  };

  const NoTokenView = () => {
    return (
      <view class="flex items-center">
        <view class="w-100 h-100 bg-gray rounded-[100rpx] mr-2 flex center">
          <image
            src="http://192.168.1.127:5500/profile.png"
            class="w-50 h-50"
          ></image>
        </view>
        <view onClick={() => setVisible(true)} class="flex center">
          立即登录
          <image
            src="http://192.168.1.127:5500/less.png"
            class="ml-1 w-32 h-32 rotate-180"
          ></image>
        </view>
      </view>
    );
  };

  return (
    <view class="p-4" id={ROOT_ID}>
      <Show when={user().token} fallback={NoTokenView()}>
        <view class="flex items-center">
          <view class="w-100 h-100 bg-gray rounded-[100rpx] mr-2 flex center">
            <image
              src="http://192.168.1.127:5500/profile.png"
              class="w-50 h-50"
            ></image>
          </view>
          <text>{encryptPhone(phone())}</text>
        </view>
        <Card class="shadow border-solid mt-10">
          <view></view>
        </Card>
        <button
          class="absolute bottom-xs left-1_2 w-7/8 translate-x--1_2"
          size="default"
          onClick={() => setVisible(true)}
        >
          切换账号
        </button>
      </Show>
      <Dialog
        title="手机号登录"
        visible={visible()}
        onClose={() => setVisible(false)}
      >
        <view class="h-xl flex flex-col">
          <view class="w-full h-90 flex flex-nowrap items-center border border-gray-4 border-solid rounded-lg my-5 px-2 box-border">
            <text class="mr-2 pr-2 border-r-style-solid border border-gray-2">
              +86
            </text>
            <input
              placeholder="请输入手机号"
              type="number"
              use:model={[phone, setPhone]}
            />
          </view>
          <button
            class={clsx(
              "mt-auto w-full mb-5",
              regPhone.test(phone()) ? "bg-slate-900 text-white" : ""
            )}
            onClick={login}
          >
            登录
          </button>
        </view>
      </Dialog>
    </view>
  );
}
