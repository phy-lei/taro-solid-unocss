import Taro from '@tarojs/taro';
import { map } from 'nanostores';
import { StorageKey } from '@/utils/constants'

export const $user = map<{
  token: string;
  phone: string;
  currentPlatformId: number | null
}>({
  token: Taro.getStorageSync(StorageKey.TOKEN),
  phone: Taro.getStorageSync(StorageKey.PHONE),
  currentPlatformId: Taro.getStorageSync(StorageKey.PLATFORM_ID),
});

export const $setToken = (token: string) => {
  $user.setKey('token', token)
  Taro.setStorageSync(StorageKey.TOKEN, token)
}

export const $setPhone = (phone: string) => {
  $user.setKey('phone', phone)
  Taro.setStorageSync(StorageKey.PHONE, phone)
}

export const $setCurrentPlatformId = (id: number | null) => {
  $user.setKey('currentPlatformId', id)
  Taro.setStorageSync(StorageKey.PLATFORM_ID, id)
}

export const $clearUser = () => {
  $user.setKey('phone', '')
  $user.setKey('token', '')
  Taro.removeStorageSync(StorageKey.TOKEN)
  Taro.removeStorageSync(StorageKey.PHONE)
}
