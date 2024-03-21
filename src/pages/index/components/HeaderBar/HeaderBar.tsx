import Taro from "@tarojs/taro";
import Tabs from "@/components/Tabs/Tabs";

interface Props {
  tabsData: any[];
  handleMore?: () => void;
}

const HeaderBar = (props: Props) => {
  const handleScan = () => {
    Taro.scanCode({
      scanType: ["barCode"],
      success: (res) => {
        Taro.navigateTo({ url: `/pages/edit/index?barCode=${res.result}` });
      },
    });
  };
  return (
    <view class="pt-102rpx">
      <view class="fixed top-0 left-0 flex items-center w-full h-70 my-2 px-2 bg-white z-999 box-border">
        <image
          class="w-130 h-70"
          src="https://i1.hdslb.com/bfs/static/jinkela/long/mstation/logo-bilibili-pink.png@132w_60h_1c.webp"
        ></image>
        <view class="h-70 flex flex-nowrap items-center border border-gray-4 border-solid rounded-lg px-2 flex-1 mx-13">
          <image
            src="http://192.168.1.127:5500/search.png"
            class="w-40 h-40 mr-2"
          ></image>
          <input placeholder="Search" />
        </view>
        <view class="flex items-center ml-auto ">
          <image
            src="http://192.168.1.127:5500/scan.png"
            class="w-40 h-40"
            onClick={handleScan}
          ></image>
        </view>
      </view>
      <view class="relative">
        <view class="flex center justify-between border-b-style-solid border border-gray-1 px-4">
          <view class="w-90% relative">
            <Tabs data={props.tabsData} defaultValue="-1"></Tabs>
          </view>
          <image
            src="http://192.168.1.127:5500/down.png"
            class="w-40 h-40 pl-4"
            onClick={props?.handleMore}
          ></image>
        </view>
      </view>
    </view>
  );
};

export default HeaderBar;
