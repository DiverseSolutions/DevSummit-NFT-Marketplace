import { atom } from 'recoil';

const metamaskAccountsAtom = atom({
  key: 'metamaskAccountsState',
  default: [],
});

export default metamaskAccountsAtom
