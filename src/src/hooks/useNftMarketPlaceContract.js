import { ethers } from "ethers";
import {useEffect, useState} from "react";

import { useRecoilState } from 'recoil';

import diverseNftMarketPlaceAbi from '../abi/contracts/DiverseNftMarketplace.sol/DiverseNftMarketplace.json'
import { DiverseNftMarketPlaceAddress } from '../constants'

export default function useNftContract(){
  const [haveMetamask,setHaveMetamask] = useRecoilState(haveMetamaskAtom)
  const [nftMarketPlaceContract, setNftMarketPlaceContract] = useState(null)

  useEffect(() => {
    if(haveMetamask){
      let provider = new ethers.providers.Web3Provider(window.ethereum)
      let contract = new ethers.Contract(DiverseNftMarketPlaceAddress, diverseNftMarketPlaceAbi, provider);
      
      setNftMarketPlaceContract(contract)
    }
  },[])

  return [nftMarketPlaceContract]
}
