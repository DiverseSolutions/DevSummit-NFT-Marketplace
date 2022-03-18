import React from 'react';

import Header from './components/Header/Header.js'

// importing MyRouts where we located all of our theme
import MyRoutes from './routers/routes';
import './main.css';

import { RecoilRoot, } from 'recoil';

function App() {

  return (
    <RecoilRoot>
      <Header />
      <MyRoutes />
    </RecoilRoot>
  );
}

export default App;
