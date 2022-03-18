import { ethers } from "ethers";
import {useEffect, useState} from "react";

import diverseNftAbi from '../abi/contracts/DiverseNFT.sol/DiverseNFT.json'
import { DiverseNftAddress } from '../constants'

import metamaskHooks from '../metamask-hooks/metamask-hooks.js'

export default function useNftContract(){

  const [nftContract, setNftContract] = useState(null)
  const [nftContractSigner, setNftContractSigner] = useState(null)

  useEffect(() => {
    if(metamaskHooks.utils.checkMetamask()){
      let provider = new ethers.providers.Web3Provider(window.ethereum)
      let _nftContact = new ethers.Contract(DiverseNftAddress, diverseNftAbi, provider);
      let _nftContractSigner = _nftContact.connect(provider);

      setNftContractSigner(_nftContractSigner)
      setNftContract(_nftContact)
    }
  }, [])


  return [nftContract,nftContractSigner] 
}
