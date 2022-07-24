import React, { Suspense } from "react";
import { WalletWeb3Provider } from "./context/WalletWeb3Context";
import { Web3ReactProvider } from '@web3-react/core'
import AOS from "aos";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import { getLibrary } from "./utils/web3React";

///////////////////////////////////////
const Home = React.lazy(() => import("./Pages/Home"));
//animation aos init
AOS.init();
const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {/* <WalletWeb3Provider> */}
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} exact />
          </Routes>
        </BrowserRouter>
      </Suspense>
      {/* </WalletWeb3Provider> */}
    </Web3ReactProvider>
  );
};

export default App;
