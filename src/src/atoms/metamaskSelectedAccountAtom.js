import { atom } from 'recoil';

const metamaskSelectedAccountsAtom = atom({
  key: 'metamaskAccountsState',
  default: '',
});

export default metamaskSelectedAccountsAtom
