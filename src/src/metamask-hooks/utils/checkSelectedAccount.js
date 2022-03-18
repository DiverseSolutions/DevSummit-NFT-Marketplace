import { resultFormat,optionsFormat } from '../constants.js'

export default function checkSelectedAccount(haveMetamask,options = optionsFormat) {

  if(haveMetamask == false){
    if(options.log) { console.log("diverse metamask: no metamask detected on browser") }

    return false;
  }

  if(window.ethereum.selectedAddress == undefined){
    if(options.log) { console.log("diverse metamask: no metamask detected on browser") }

    return false;
  }

  if(window.ethereum.selectedAddress == ''){
    if(options.log) { console.log(`diverse metamask: selected account is empty`) }
    return false;
  }else{
    if(options.log) { console.log(`diverse metamask: selected account is ${window.ethereum.selectedAddress}`) }
    return true;
  }


}
