import React, { useEffect } from 'react';

import { useRecoilState } from 'recoil'

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Creates from '../components/Create/Create';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';



import haveMetamaskAtom from '../atoms/haveMetamaskAtom.js'
import metamaskHooks from '../metamask-hooks/metamask-hooks.js'

export default function Create() {
  const [haveMetamask,setHaveMetamask] = useRecoilState(haveMetamaskAtom)

  useEffect(() => {
    if(metamaskHooks.utils.checkMetamask({ log: true })){
      setHaveMetamask(true)
    }
  },[])

  return (
    <div className="main">
      {/* <Breadcrumb title="Create" subpage="Pages" page="Create" /> */}
      <Creates />
      <Footer />
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  )
}

