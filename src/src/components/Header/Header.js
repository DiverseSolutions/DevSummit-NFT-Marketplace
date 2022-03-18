import React, {useEffect, useMemo} from 'react'
import { useRecoilState } from 'recoil';

import metamaskAccountsAtom from '../../atoms/metamaskAccountsAtom.js'
import haveMetamaskAtom from '../../atoms/haveMetamaskAtom.js'
import metamaskSelectedAccountAtom from '../../atoms/metamaskSelectedAccountAtom.js'

import metamaskHooks from '../../metamask-hooks/metamask-hooks.js'

export default function Header() {
  const [metamaskAccounts,setMetamaskAccounts] = useRecoilState(metamaskAccountsAtom)
  const [metamaskSelectedAccount,setMetamaskSelectedAccount] = useRecoilState(metamaskSelectedAccountAtom)
  const [haveMetamask,setHaveMetamask] = useRecoilState(haveMetamaskAtom)

  const showMetamaskAccount = useMemo(() => { 
    if(metamaskSelectedAccount !== '' && metamaskSelectedAccount.length > 1){
      return metamaskSelectedAccount.substring(0,7) 
    }else{
      return ''
    }
  },[metamaskSelectedAccount])

  useEffect(() => {
    if(metamaskHooks.utils.checkSelectedAccount()){
      setMetamaskSelectedAccount(metamaskHooks.utils.getSelectedAccount())
    }
  },[])


  async function handleConnectButton(){
    if(metamaskSelectedAccount != '') return;


    if(metamaskAccounts.length == 0){
      let result = await metamaskHooks.utils.connectAccounts(haveMetamask,{ log:true })
      if(result.succeed){
        setMetamaskAccounts(result.data)

        if(metamaskHooks.utils.checkSelectedAccount()){
          setMetamaskSelectedAccount(metamaskHooks.utils.getSelectedAccount())
        }
      }
    }  
  }


  return (
    <header id="header">
      {/* Navbar */}
      <nav data-aos="zoom-out" data-aos-delay={800} className="navbar navbar-expand">
        <div className="container header">
          {/* Navbar Brand*/}
          <div className="ml-auto" />
          {/* Navbar */}
          <ul className="mx-auto navbar-nav items">
            <li className="nav-item dropdown">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link" href="#">Explore <i className="ml-1 fas fa-angle-down" /></a>
              <ul className="dropdown-menu">
                <li className="nav-item"><a href="/explore-1" className="nav-link">Explore Style 1</a></li>
                <li className="nav-item"><a href="/explore-2" className="nav-link">Explore Style 2</a></li>
                <li className="nav-item"><a href="/explore-3" className="nav-link">Explore Style 3</a></li>
                <li className="nav-item"><a href="/explore-4" className="nav-link">Explore Style 4</a></li>
                <li className="nav-item"><a href="/auctions" className="nav-link">Live Auctions</a></li>
                <li className="nav-item"><a href="/item-details" className="nav-link">Item Details</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="/activity" className="nav-link">Activity</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link" href="#">Community <i className="ml-1 fas fa-angle-down" /></a>
              <ul className="dropdown-menu">
                <li className="nav-item"><a href="/blog" className="nav-link">Blog</a></li>
                <li className="nav-item"><a href="/blog-single" className="nav-link">Blog Single</a></li>
                <li className="nav-item"><a href="/help-center" className="nav-link">Help Center</a></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link" href="#">Pages <i className="ml-1 fas fa-angle-down" /></a>
              <ul className="dropdown-menu">
                <li className="nav-item"><a href="/authors" className="nav-link">Authors</a></li>
                <li className="nav-item"><a href="/author" className="nav-link">Author</a></li>
                <li className="nav-item"><a href="/wallet-connect" className="nav-link">Wallet Connect</a></li>
                <li className="nav-item"><a href="/create" className="nav-link">Create</a></li>
                <li className="nav-item"><a href="/login" className="nav-link">Login</a></li>
                <li className="nav-item"><a href="/signup" className="nav-link">Signup</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="/contact" className="nav-link">Contact</a>
            </li>
          </ul>
          {/* Navbar Icons */}
          <ul className="navbar-nav icons">
            <li className="nav-item">
              <a href="#" className="nav-link" data-toggle="modal" data-target="#search">
                <i className="fas fa-search" />
              </a>
            </li>
          </ul>
          {/* Navbar Toggler */}
          <ul className="navbar-nav toggle">
            <li className="nav-item">
              <a href="#" className="nav-link" data-toggle="modal" data-target="#menu">
                <i className="m-0 fas fa-bars toggle-icon" />
              </a>
            </li>
          </ul>
          {/* Navbar Action Button */}
          <ul className="navbar-nav action">
            <li className="ml-3 nav-item">
              <a href="#" onClick={() => { handleConnectButton() }} className="btn ml-lg-auto btn-bordered-white"><i className="icon-wallet mr-md-2" />
                { metamaskSelectedAccount !== '' ? showMetamaskAccount + '...' : 'Connect' }
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
