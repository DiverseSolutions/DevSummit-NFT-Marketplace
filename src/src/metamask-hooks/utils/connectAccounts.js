import { resultFormat,optionsFormat } from '../constants.js'

export default async function connectAccounts(haveMetamask,options = optionsFormat) {

  if(haveMetamask == false){
    if(options.log) { console.log("diverse metamask: no metamask detected on browser") }

    throw "No Metamask Detected On Browser"
  }

  if(window.ethereum.selectedAddress != undefined){
    if(options.log) { console.log("diverse metamask: no metamask detected on browser") }

    throw 'Metamask Object Already Has Accounts, No Need To Request Accounts'
  }

  try{
    let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    return { ...resultFormat, succeed: true, data: accounts }
  }catch(error){
    if (error.code === 4001) {
      if(options.log) { console.log("diverse metamask: user has rejected metamask connection") }
      return { ...resultFormat, error: "User Has Rejected Metamask Connection" }
    } else {
      if(options.log) { console.log(`diverse metamask: ${error.message}`) }
      return { ...resultFormat, error: error.message }
    }
  }
}
