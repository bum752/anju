import { atom } from 'recoil';

export const storeSiderComponentCollapseState = atom<boolean>({
  key: 'storeSiderComponentCollapseState',
  default: true,
});
