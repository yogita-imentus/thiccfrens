import './App.css';
import {  useRoutes,Switch,Route  } from 'react-router-dom';
import Thicc from './Thicc';
import Dog from './Dog';
import Connect from './Connect'
import TokenDetails from './TokenDetails';
import Bitcoin from './Bitcoin';
import Yorker from './Yorker';
import React from 'react'
import Contract from './Contract'
import 'react-toastify/dist/ReactToastify.css';
import Mint from './Mint';
import Staking from './Component/Staking';
import ClickCounter from './ClickCounter';
import Collection from './View/Collection';
import ViewCollection from './View/ViewCollection';
import MintNew from './Component/Mint/MintNew';
import Coinbase from './Component/Wallet/Coinbase';

function Router() {
  console.log('token Contract',Contract)
  return useRoutes([
    {
      path:'/',
      element:<Thicc />
    },
    {
      path:'/connect',
      element:<Connect />
    },
    {
      path:'/token',
      element:<TokenDetails/>
    },
    {
      path:'/dog',
      element:<Dog/>
    },

    {
      path:'/coinbase',
      element:<Coinbase/>
    },

    {
      path:'/bitcoin',
      element:<Bitcoin/>
    },
    {
      path:'/yorker',
    element:<Yorker/>
    },
    {
      path:'/mint',
    element:<Mint/>
    },
    {
      path:'/mintnew',
    element:<MintNew/>
    },
    {
      path:'/staking',
    element:<Staking/>
    },
    {
      path:'/counterclick',
    element:<ClickCounter/>
    },
    {
      path:'/collection',
    element:<Collection/>
    },
    {
      path:'/viewcollection',
    element:<ViewCollection/>
    },
  ])
}

function App() {
  return (
    <div>
   <Router />
   
   </div>
  );
}

export default App;
