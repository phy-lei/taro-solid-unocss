import { atom } from 'nanostores';

export const $needRefresh = atom(false);

export const $setNeedRefresh = (flag: boolean) => {
  $needRefresh.set(flag)
};


