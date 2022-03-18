import { atom } from 'recoil';

const haveMetamaskAtom = atom({
  key: 'haveMetamaskState',
  default: false,
});

export default haveMetamaskAtom
