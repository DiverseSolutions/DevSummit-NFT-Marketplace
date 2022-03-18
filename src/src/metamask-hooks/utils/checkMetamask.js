import { optionsFormat } from '../constants.js'

export default function checkMetamask(options = optionsFormat) {
  if (typeof window.ethereum !== 'undefined') {
    if(window.ethereum.isMetaMask){
      if(options.log){ console.log("diverse-metamask-hooks: browser has metamask") }
      return true;
    }else{
      if(options.log){ console.log("diverse-metamask-hooks: browser wallet isn't metamask") } 
      return false;
    }
  }else{
    if(options.log){ console.log("diverse-metamask-hooks: browser does not have metamask") }
    return false;
  }
}
