import { resultFormat,optionsFormat } from '../constants.js'

export default function getSelectedAccount(haveMetamask,options = optionsFormat) {

  if(haveMetamask == false){
    if(options.log) { console.log("diverse metamask: no metamask detected on browser") }

    throw "No Metamask Detected On Browser"
  }

  if(window.ethereum.selectedAddress == undefined){
    if(options.log) { console.log("diverse metamask: no metamask detected on browser") }

    throw 'Metamask has not given permission for accounts'
  }

  if(options.log) { console.log(`diverse metamask: selected account is ${window.ethereum.selectedAddress}`) }
  return window.ethereum.selectedAddress;

}
