import React, { useEffect } from 'react';
import { useRecoilState,useRecoilValue } from 'recoil';

import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Auctions from '../components/Auctions/AuctionsOne';
import TopSeller from '../components/TopSeller/TopSellerOne';
import Collections from '../components/Collections/Collections';
import Explore from '../components/Explore/ExploreOne';
import Work from '../components/Work/Work';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

import haveMetamaskAtom from '../atoms/haveMetamaskAtom.js'
import metamaskHooks from '../metamask-hooks/metamask-hooks.js'

export default function ThemeOne() {
  const [haveMetamask,setHaveMetamask] = useRecoilState(haveMetamaskAtom)

  useEffect(() => {
    if(metamaskHooks.utils.checkMetamask({ log: true })){
      setHaveMetamask(true)
    }
  },[])

  return (
    <div className="main">
      <React.Suspense fallback={<div>Loading...</div>}>
        <Hero />
        <Auctions />
        <TopSeller />
        <Collections />
        <Explore />
        <Work />
        <Footer />
        <ModalSearch />
        <ModalMenu />
        <Scrollup />
      </React.Suspense>
    </div>
  )
}
